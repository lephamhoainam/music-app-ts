import { Request, Response } from "express";

import Role from "../../models/role.model";
import { systemConfig } from "../../config/config";

// [GET] /admin/roles
export const index = async (req: Request, res: Response) => {
    const roles = await Role.find({
        deleted: false
    });

    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền hệ thống",
        roles: roles
    });
}


// [GET] /admin/roles/create
export const create = async (req: Request, res: Response) => {
    res.render("admin/pages/roles/create", {
        pageTitle: "Tạo mới nhóm quyền hệ thống"
    });
}


// [POST] /admin/roles/create
export const createPost = async (req: Request, res: Response) => {
    const dataRole = {
        title: req.body.title,
        description: req.body.description
    }

    const role = new Role(dataRole);
    await role.save();
    
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}


// [GET] /admin/roles/edit/:id
export const edit = async (req: Request, res: Response) => {
    const role = await Role.findOne({
        _id: req.params.id
    });

    res.render("admin/pages/roles/edit", {
        pageTitle: "Chỉnh sửa nhóm quyền hệ thống",
        role: role
    });
}


// [PATCH] /admin/roles/edit/:id
export const editPatch = async (req: Request, res: Response) => {
    const dataRole = {
        title: req.body.title,
        description: req.body.description
    }

    await Role.updateOne({
        _id: req.params.id
    }, dataRole);
    
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}


// [DELETE] /admin/roles/edit/:id
export const deleteItem = async (req: Request, res: Response) => {
    await Role.updateOne({
        _id: req.params.id
    }, {
        deleted: true
    });
    
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}


// [GET] /admin/roles/permission
export const permission = async (req: Request, res: Response) => {
    const records = await Role.find({
        deleted: false
    });

    res.render("admin/pages/roles/permission", {
        pageTitle: "Phân quyền hệ thống",
        records: records
    });
}


// [PATCH] /admin/roles/permission
export const permissionPatch = async (req: Request, res: Response) => {
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
        await Role.updateOne({
            _id: item.id
        }, {
            permissions: item.permissions
        });
    }

    res.redirect(`/${systemConfig.prefixAdmin}/roles/permissions`);
}
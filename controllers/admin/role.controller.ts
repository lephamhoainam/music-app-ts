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
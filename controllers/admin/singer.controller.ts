import { Request, Response } from "express";

import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";

// [GET] /admin/singers
export const index = async (req: Request, res: Response) => {
    const singers = await Singer.find({
        deleted: false
    });

    res.render("admin/pages/singers/index", {
        pageTitle: "Quản lý ca sĩ",
        singers: singers
    });
}


// [GET] /admin/singers/create
export const create = async (req: Request, res: Response) => {
    res.render("admin/pages/singers/create", {
        pageTitle: "Thêm mới ca sĩ"
    });
}


// [POTS] /admin/singers/create
export const createPost = async (req: Request, res: Response) => {
    const dataSinger = {
        fullname: req.body.fullname,
        status: req.body.status,
        avatar: req.body.avatar
    }

    const singer = new Singer(dataSinger);
    await singer.save();

    res.redirect(`/${systemConfig.prefixAdmin}/singers`);
}


// [GET] /admin/singers/create
export const edit = async (req: Request, res: Response) => {
    const singer = await Singer.findOne({
        _id: req.params.id
    });

    res.render("admin/pages/singers/edit", {
        pageTitle: "Chỉnh sửa ca sĩ",
        singer: singer
    });
}


// [PATCH] /admin/singers/create
export const editPatch = async (req: Request, res: Response) => {
    const dataSinger = {
        fullname: req.body.fullname,
        status: req.body.status
    }

    if(req.body.avatar) {
        (dataSinger as any).avatar = req.body.avatar
    }

    await Singer.updateOne({
        _id: req.params.id
    }, dataSinger);

    res.redirect(`/${systemConfig.prefixAdmin}/singers`);
}


// [DELETE] /admin/singers/create
export const deleteItem = async (req: Request, res: Response) => {
    await Singer.updateOne({
        _id: req.params.id
    }, {
        deleted: true
    })

    res.redirect(`/${systemConfig.prefixAdmin}/singers`);
}
import { Request, Response } from "express";

import Role from "../../models/role.model";

import { systemConfig } from "../../config/config";
import Account from "../../models/account.model";

// [GET] /admin/my-account
export const index = async (req: Request, res: Response) => {
    const user = res.locals.user;

    const roles = await Role.find({
        deleted: false
    });

    res.render("admin/pages/my-account/index", {
        pageTitle: "Tài khoản của tôi",
        roles: roles
    });
}


// [POST] /admin/my-account
export const editPost = async (req: Request, res: Response) => {
    const userId = res.locals.user;
    const updatedData: any= {};

    // Loại bỏ field rỗng
    Object.keys(req.body).forEach((key) => {
        if(req.body[key] === '')
            delete req.body[key];
    });
    // Kết thúc loại bỏ field rỗng

    // Thêm filed đã thay đổi vào object
    for (const key in req.body) {
        if(String(req.body[key]) !== String(userId[key])) {
            updatedData[key] = req.body[key];
        }
    }
    // Kết thúc thêm filed đã thay đổi vào object

    if(Object.keys(updatedData).length > 0) {
        await Account.updateOne({
            _id: userId._id
        }, updatedData);
    }

    res.redirect(`/${systemConfig.prefixAdmin}/my-account`);
}
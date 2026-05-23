import { Request, Response } from "express";

import Account from "../../models/account.model";
import Role from "../../models/role.model";

// [GET] /admin/accounts
export const index = async (req: Request, res: Response) => {
    const accounts = await Account.find({
        deleted: false
    });

    res.render("admin/pages/accounts/index", {
        pageTitle: "Tài khoản hệ thống",
        accounts: accounts
    });
}


// [GET] /admin/accounts/create
export const create = async (req: Request, res: Response) => {
    const roles = await Role.find({
        deleted: false
    }).select("-permissions");

    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo mới tài khoản hệ thống",
        roles: roles
    });
}
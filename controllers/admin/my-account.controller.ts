import { Request, Response } from "express";

import Role from "../../models/role.model";

import { systemConfig } from "../../config/config";

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
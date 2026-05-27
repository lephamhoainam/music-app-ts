import { Request, Response } from "express";
import { systemConfig } from "../../config/config";
import User from "../../models/user.model";

// [GET] /admin/users
export const index = async (req: Request, res: Response) => {
    const users = await User.find({
        deleted: false,
        status: "active"
    });

    res.render("admin/pages/users/index", {
        pageTitle: "Quản lý tài khoản người dùng",
        users: users
    });
}
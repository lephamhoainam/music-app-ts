import Account from "../../models/account.model";

import { Request, Response } from "express";
import { systemConfig } from "../../config/config";

import md5 from "md5";

// [GET] /admin/auth/login
export const login = async (req: Request, res: Response) => {  
    if(req.cookies.token) {
        res.redirect(`/${systemConfig.prefixAdmin}/admin/dashboard`);
    } else {
        res.render("admin/pages/auth/login", {
            pageTitle: "Đăng nhập"
        });
    }
}


// [POST] /admin/auth/login
export const loginPost = async (req: Request, res: Response) => {  
    const dataLogin = {
        email: req.body.email,
        password: md5(req.body.password)
    }

    const account = await Account.findOne({
        deleted: false,
        email: dataLogin.email,
        password: dataLogin.password
    });

    if(account) {
        res.cookie("token", account?.token);
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
    } else {
        res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
    } 
}


// [GET] /admin/auth/logout
export const logout = async (req: Request, res: Response) => {  
    res.clearCookie("token");
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
}
import { Request, Response } from "express";

import md5 from "md5";

import User from "../../models/user.model";


// [GET] /user/register
export const register = async (req: Request, res: Response) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký"
    });
}


// [POST] /user/register
export const registerPost = async (req: Request, res: Response) => {
    const emailExist = await User.findOne({
        email: req.body.email
    });

    if(emailExist) {
        return;
    }

    req.body.password = md5(req.body.password);

    const newUser = new User(req.body);
    await newUser.save();

    res.redirect("/user/login");
}


// [GET] /user/login
export const login = async (req: Request, res: Response) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập"
    });
}


// [POST] /user/login
export const loginPost = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existEmail = await User.findOne({
        deleted: false,
        status: "active",
        email: email
    });

    if(existEmail) {
        res.cookie("tokenUser", existEmail.tokenUser);
    }

    res.redirect("/");
}


// [GET] /user/logout
export const logout = async (req: Request, res: Response) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
}



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

    const dataRegister = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: md5(req.body.fullname)
    }

    const newUser = new User(dataRegister);
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


// [GET] /user/info
export const info = async (req: Request, res: Response) => {  
    res.render("client/pages/user/info", {
        pageTitle: "Thông tin cá nhân"
    });
}


// [POST] /user/info
export const infoPost = async (req: Request, res: Response) => { 
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
        await User.updateOne({
            _id: userId._id
        }, updatedData);
    }

    res.redirect("/user/info");
}
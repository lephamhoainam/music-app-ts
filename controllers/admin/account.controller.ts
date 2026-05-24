import { Request, Response } from "express";

import md5 from 'md5';

import Account from "../../models/account.model";
import Role from "../../models/role.model";
import { systemConfig } from "../../config/config";

// [GET] /admin/accounts
export const index = async (req: Request, res: Response) => {
    const accounts = await Account.find({
        deleted: false
    }).select("-password -token");

    for (const account of accounts) {
        const role = await Role.findOne({
            _id: account.roleId
        }).select("title");
        
        (account as any).roleName = role;
    }

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


// [POST] /admin/accounts/create
export const createPost = async (req: Request, res: Response) => {
    const dataAccount = {
        email: req.body.email, 
        password: md5(req.body.password),
        roleId: req.body.roleId,
        status: req.body.status,
        fullname: req.body.fullname
    }

    const emailExist = await Account.find({
        email: dataAccount.email
    });

    if(!emailExist) {
        const newAccount = new Account(dataAccount);
        await newAccount.save();
    }

    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}


// [POST] /admin/accounts/delete/:id
export const deleteItem = async (req: Request, res: Response) => {
    await Account.updateOne({
        _id: req.params.id
    }, {
        deleted: true
    });

    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}
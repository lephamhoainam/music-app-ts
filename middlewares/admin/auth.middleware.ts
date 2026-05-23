import { Request, Response, NextFunction } from "express";

import { systemConfig } from "../../config/config";

import Account from "../../models/account.model";
import Role from "../../models/role.model";

export const authRequire = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.cookies.token) {
        return res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
    }

    const account = await Account.findOne({
        token: req.cookies.token 
    }).select("-password");

    const role = await Role.findOne({
        _id: account?.roleId
    });

    res.locals.user = account;
    res.locals.role = role;

    next();
}
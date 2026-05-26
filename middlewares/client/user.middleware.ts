import { Request, Response, NextFunction } from "express";

import User from "../../models/user.model";

export const userRequire = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.cookies.tokenUser) {
        return res.redirect(`/user/login`);
    }

    const user = await User.findOne({
        tokenUser: req.cookies.tokenUser
    }).select("-password");

    res.locals.user = user;
    next();
}
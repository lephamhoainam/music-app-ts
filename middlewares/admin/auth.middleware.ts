import { Request, Response, NextFunction } from "express";

import { systemConfig } from "../../config/config";

export const authRequire = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.cookies.token) {
        return res.redirect(`/${systemConfig.prefixAdmin}/admin/auth/login`);
    }

    next();
}
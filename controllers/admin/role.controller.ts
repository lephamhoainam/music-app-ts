import { Request, Response } from "express";

import { systemConfig } from "../../config/config";

// [GET] /admin/roles
export const index = async (req: Request, res: Response) => {
    res.render("admin/pages/roles/index", {
        pageTitle: "Quản lý ca sĩ"
    });
}
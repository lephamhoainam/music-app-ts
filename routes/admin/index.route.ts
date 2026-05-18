import { Express } from "express";
import { systemConfig } from "../../config/config";

import { dashboardRoute } from "./dashboard.route";

const adminRoute = (app: Express): void => {
    const pathAdmin = systemConfig.prefixAdmin;

    app.use(`/${pathAdmin}/dashboard`, dashboardRoute);
}

export default adminRoute;
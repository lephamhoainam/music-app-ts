import { Express } from "express";
import { systemConfig } from "../../config/config";

import { dashboardRoute } from "./dashboard.route";
import { topicRoute } from "./topic.route";
import { songRoute } from "./song.route";
import { singerRoute } from "./singer.route";
import { roleRoute } from "./role.route";
import { accountRoute } from "./account.route";
import { authRoute } from "./auth.route";

import * as authMiddleware from "../../middlewares/admin/auth.middleware";

const adminRoute = (app: Express): void => {
    const pathAdmin = systemConfig.prefixAdmin;

    app.use(`/${pathAdmin}/dashboard`, authMiddleware.authRequire, dashboardRoute);

    app.use(`/${pathAdmin}/topics`, authMiddleware.authRequire,topicRoute);

    app.use(`/${pathAdmin}/songs`, authMiddleware.authRequire,songRoute);

    app.use(`/${pathAdmin}/singers`, authMiddleware.authRequire, singerRoute);

    app.use(`/${pathAdmin}/roles`, authMiddleware.authRequire, roleRoute);

    app.use(`/${pathAdmin}/accounts`, authMiddleware.authRequire, accountRoute);

    app.use(`/${pathAdmin}/auth`, authRoute);
}

export default adminRoute;
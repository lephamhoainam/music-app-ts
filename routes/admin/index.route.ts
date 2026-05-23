import { Express } from "express";
import { systemConfig } from "../../config/config";

import { dashboardRoute } from "./dashboard.route";
import { topicRoute } from "./topic.route";
import { songRoute } from "./song.route";
import { singerRoute } from "./singer.route";
import { roleRoute } from "./role.route";
import { accountRoute } from "./account.route";
import { authRoute } from "./auth.route";

const adminRoute = (app: Express): void => {
    const pathAdmin = systemConfig.prefixAdmin;

    app.use(`/${pathAdmin}/dashboard`, dashboardRoute);

    app.use(`/${pathAdmin}/topics`, topicRoute);

    app.use(`/${pathAdmin}/songs`, songRoute);

    app.use(`/${pathAdmin}/singers`, singerRoute);

    app.use(`/${pathAdmin}/roles`, roleRoute);

    app.use(`/${pathAdmin}/accounts`, accountRoute);

    app.use(`/${pathAdmin}/auth`, authRoute);
}

export default adminRoute;
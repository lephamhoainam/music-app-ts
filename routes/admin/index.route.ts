import { Express } from "express";
import { systemConfig } from "../../config/config";

import { dashboardRoute } from "./dashboard.route";
import { topicRoute } from "./topic.route";
import { songRoute } from "./song.route";

const adminRoute = (app: Express): void => {
    const pathAdmin = systemConfig.prefixAdmin;

    app.use(`/${pathAdmin}/dashboard`, dashboardRoute);

    app.use(`/${pathAdmin}/topics`, topicRoute);

    app.use(`/${pathAdmin}/songs`, songRoute);
}

export default adminRoute;
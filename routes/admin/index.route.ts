import { Express } from "express";
import { systemConfig } from "../../config/config";

import { dashboardRoute } from "./dashboard.route";
import { topicRoute } from "./topic.route";
import { songRoute } from "./song.route";
import { singerRoute } from "./singer.route";

const adminRoute = (app: Express): void => {
    const pathAdmin = systemConfig.prefixAdmin;

    app.use(`/${pathAdmin}/dashboard`, dashboardRoute);

    app.use(`/${pathAdmin}/topics`, topicRoute);

    app.use(`/${pathAdmin}/songs`, songRoute);

    app.use(`/${pathAdmin}/singers`, singerRoute);
}

export default adminRoute;
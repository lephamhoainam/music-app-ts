import { Express } from "express";
import { topicRoute } from "./topic.route";
import { songRoute } from "./song.route";
import { favoriteSongRoute } from "./favorite-song.route";
import { searchRoute } from "./search.route";
import { dashboardRoute } from "./dashboard.route";
import { userRoute } from "./user.route";

import * as userMiddleware from "../../middlewares/client/user.middleware";

const clientRoute = (app: Express): void => {
    app.use(userMiddleware.infoUser);

    app.use(`/topics`, topicRoute);

    app.use(`/songs`, songRoute);

    app.use(`/favorite-songs`, favoriteSongRoute);

    app.use(`/`, dashboardRoute);

    app.use(`/search`, searchRoute);

    app.use(`/user`, userRoute);
}

export default clientRoute;
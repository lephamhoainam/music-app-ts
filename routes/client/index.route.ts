import { Express } from "express";
import { topicRoute } from "./topic.route";
import { songRoute } from "./song.route";
import { favoriteSongRoute } from "./favorite-song.route";

const clientRoute = (app: Express): void => {
    app.use(`/topics`, topicRoute);

    app.use(`/songs`, songRoute);

    app.use(`/favorite-songs`, favoriteSongRoute);
}

export default clientRoute;
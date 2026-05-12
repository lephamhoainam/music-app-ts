import { Express } from "express";
import { topicRoute } from "./topic.route";

const clientRoute = (app: Express): void => {
    app.use(`/topics`, topicRoute);
}

export default clientRoute;
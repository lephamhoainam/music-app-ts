import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";

dotenv.config();
database.connect();

import clientRoute from "./routes/client/index.route";

const app: Express = express();
const port: Number = 3000;

app.set("views", "./views");
app.set("view engine", "pug");

clientRoute(app);

app.listen(port, () => {
    console.log(`App listen on port ${port}`)
});
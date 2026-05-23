import express, { Express } from "express";
import dotenv from "dotenv";

import * as database from "./config/database";
import { systemConfig } from "./config/config";

import methodOverride from "method-override";

import path from "path";
import cookieParser from "cookie-parser";

import clientRoute from "./routes/client/index.route";
import adminRoute from "./routes/admin/index.route";

dotenv.config();
database.connect();

const app: Express = express();
const port: Number | String = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public")); 
app.use(methodOverride("_method"));

app.set("views", "./views");
app.set("view engine", "pug");

// Tiny mce
app.use('/tinymce', express.static(path.join(__dirname, "node_modules", "tinymce")));

// App local variable 
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(cookieParser());

// Route
clientRoute(app);
adminRoute(app);

app.listen(port, () => {
    console.log(`App listen on port ${port}`)
});
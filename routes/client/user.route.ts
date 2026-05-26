import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/client/user.controller";

router.get("/register", controller.register);

router.post("/register", controller.registerPost);

router.get("/login", controller.login);

export const userRoute: Router = router;
import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/client/user.controller";

router.get("/register", controller.register);

router.post("/register", controller.registerPost);

export const userRoute: Router = router;
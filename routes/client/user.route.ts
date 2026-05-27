import { Router } from "express";
import multer from "multer";
const router: Router = Router();

import * as controller from "../../controllers/client/user.controller";
import * as authMiddleware from "../../middlewares/client/auth.middleware";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer();

router.get("/register", controller.register);

router.post("/register", controller.registerPost);

router.get("/login", controller.login);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);

router.get("/info", authMiddleware.authRequire, controller.info);

router.post("/info", authMiddleware.authRequire, upload.single("avatar"), uploadCloud.uploadSingle, controller.infoPost);

export const userRoute: Router = router;
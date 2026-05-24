import { Router } from "express";
import multer from "multer";
const router: Router = Router();

import * as controller from "../../controllers/admin/my-account.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer();

router.get("/", controller.index);

router.post("/", upload.single("avatar"), uploadCloud.uploadSingle, controller.editPost);

export const myAccountRoute: Router = router;
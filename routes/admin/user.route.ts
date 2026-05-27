import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/admin/user.controller";

router.get("/", controller.index);

// router.get("/create", controller.create);

// router.post("/create", upload.single("avatar"), uploadCloud.uploadSingle, controller.createPost);

// router.get("/edit/:id", controller.edit);

// router.patch("/edit/:id", upload.single("avatar"), uploadCloud.uploadSingle, controller.editPatch);

// router.delete("/delete/:id", controller.deletePatch);

export const userRoute: Router = router;
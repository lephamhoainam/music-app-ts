import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/admin/user.controller";

router.get("/", controller.index);

router.delete("/delete/:id", controller.deletePatch);

export const userRoute: Router = router;
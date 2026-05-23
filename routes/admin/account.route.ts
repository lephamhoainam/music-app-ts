import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/admin/account.controller";

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.createPost);

router.delete("/delete/:id", controller.deleteItem);

export const accountRoute: Router = router;
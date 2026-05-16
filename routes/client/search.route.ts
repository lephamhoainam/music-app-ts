import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/client/search.controller";

router.get("/result", controller.resultSearch);

export const searchRoute: Router = router;
import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/client/favorite-song.controller";

router.get("/", controller.favoriteSongs);

export const favoriteSongRoute: Router = router;
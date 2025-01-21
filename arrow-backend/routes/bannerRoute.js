import express from "express";
import formidable from "express-formidable";

import {
  CreateBannerController,
  deleteBannerController,
  getBannerController,
  getBannerImageController,
  getSingleBannerController,
  updateBannerController,
} from "../controllers/bannerController.js";

const router = express.Router();

router.post("/create-banner", formidable(), CreateBannerController);
router.get("/get-banner", getBannerController);
//single product
router.get("/get-banner/:slug", getSingleBannerController);
router.put("/update-banner/:id", formidable(), updateBannerController);
router.delete("/delete-banner/:pid", deleteBannerController);
router.get("/get-banner-image/:id", getBannerImageController);
export default router;

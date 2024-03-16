import { Router } from "express";
const router = Router();
import {
  addBrands,
  getBrand,
  removeBrands,
  updateBrands,
  getBrandbyid,
} from "./../../controllers/brand.controller.js";

router.route("/add").post(addBrands);
router.route("/all").get(getBrand);
router.route("/edit/:id").put(updateBrands);
router.route("/remove/:id").delete(removeBrands);
router.route("/all/:id").get(getBrandbyid);

export default router;

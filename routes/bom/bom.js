import { Router } from "express";
const router = Router();
import {
  addBom,
  deleteBom,
  getBom,
  getBombyid,
  updateBom,
} from "./../../controllers/bom.controller.js";

router.route("/add").post(addBom);
router.route("/all").get(getBom);
router.route("/edit/:id").put(updateBom);
router.route("/remove/:id").delete(deleteBom);
router.route("/all/:id").get(getBombyid);

export default router;

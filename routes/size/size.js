import { Router } from "express";
const router = Router();
import {
  addSize,
  getSize,
  removeSize,
  updateSize,
  getSizebyid,
} from "./../../controllers/size.controller.js";

router.route("/add").post(addSize);
router.route("/all").get(getSize);
router.route("/edit/:id").put(updateSize);
router.route("/remove/:id").delete(removeSize);
router.route("/all/:id").get(getSizebyid);

export default router;

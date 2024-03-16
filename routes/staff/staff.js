import { Router } from "express";
const router = Router();
import {
  addStaff,
  removeStaff,
  updateStaff,
  getStaff,
} from "./../../controllers/staff.controller.js";

router.route("/add").post(addStaff);
router.route("/all").get(getStaff);
router.route("/edit/:id").put(updateStaff);
router.route("/remove/:id").delete(removeStaff);

export default router;

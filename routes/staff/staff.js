import { Router } from "express";
const router = Router();
import {
  addStaff,
  removeStaff,
  updateStaff,
  getStaff,
  getStaffbyid,
} from "./../../controllers/staff.controller.js";

router.route("/add").post(addStaff);
router.route("/all").get(getStaff);
router.route("/edit/:id").put(updateStaff);
router.route("/remove/:id").delete(removeStaff);
router.route("/all/:id").get(getStaffbyid);

export default router;

import { Router } from "express";
const router = Router();
import {
  addStatus,
  deleteStatus,
  getStatus,
  getStatusbyid,
  updateStatus,
} from "./../../controllers/status.controller.js";

router.route("/add").post(addStatus);
router.route("/all").get(deleteStatus);
router.route("/edit/:id").put(getStatus);
router.route("/remove/:id").delete(getStatusbyid);
router.route("/all/:id").get(updateStatus);

export default router;

import { Router } from "express";
const router = Router();
import {
  addStatus,
  deleteStatus,
  getStatus,
  getStatusbyid,
  updateStatus,
  getitemStatus,
  getfinished,
} from "./../../controllers/status.controller.js";

router.route("/add").post(addStatus);
router.route("/all").get(getStatus);
router.route("/edit/:id").put(updateStatus);
router.route("/remove/:id").delete(deleteStatus);
router.route("/all/:id").get(getStatusbyid);
router.route("/itemstatus").get(getitemStatus);
router.route("/finished").get(getfinished);

export default router;

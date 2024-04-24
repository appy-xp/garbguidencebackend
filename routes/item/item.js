import { Router } from "express";
const router = Router();
import {
  addItem,
  getItem,
  getItembyid,
  removeItem,
  updateItem,
  getStaffItem,
  getpendingItems,
  getcompletedItems,
} from "./../../controllers/item.controller.js";

router.route("/add").post(addItem);
router.route("/all").get(getItem);
router.route("/edit/:id").put(updateItem);
router.route("/remove/:id").delete(removeItem);
router.route("/all/:id").get(getItembyid);
router.route("/staffassigned/").get(getStaffItem);
router.route("/pending/").get(getpendingItems);
router.route("/completed/").get(getcompletedItems);

export default router;

import { Router } from "express";
const router = Router();
import {
  addItem,
  getItem,
  getItembyid,
  removeItem,
  updateItem,
} from "./../../controllers/item.controller.js";

router.route("/add").post(addItem);
router.route("/all").get(getItem);
router.route("/edit/:id").put(updateItem);
router.route("/remove/:id").delete(removeItem);
router.route("/all/:id").get(getItembyid);

export default router;

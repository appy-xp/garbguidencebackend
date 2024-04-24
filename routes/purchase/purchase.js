import { Router } from "express";
const router = Router();
import {
  addPurchase,
  deletePurchase,
  getPurchase,
  getPurchasebyid,
  updatePurchase,
  getPurchaseCount,
} from "./../../controllers/purchase.controller.js";

router.route("/add").post(addPurchase);
router.route("/all").get(getPurchase);
router.route("/edit/:id").put(updatePurchase);
router.route("/remove/:id").delete(deletePurchase);
router.route("/all/:id").get(getPurchasebyid);
router.route("/count").get(getPurchaseCount);
export default router;

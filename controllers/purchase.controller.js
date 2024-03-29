import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { Purchase } from "./../models/purchase/purchase.model.js";
import { purchaseMappingDetails } from "./../helpers/purchase/purchase_mapping.js";
import { purchaseDetMapping } from "./../helpers/purchase/purchaseDetails_mapping.js";

const addPurchase = asyncHandler(async (req, res) => {});
const updatePurchase = asyncHandler(async (req, res) => {});
const deletePurchase = asyncHandler(async (req, res) => {});
const getPurchase = asyncHandler(async (req, res) => {});
const getPurchasebyid = asyncHandler(async (req, res) => {});
export {
  addPurchase,
  updatePurchase,
  deletePurchase,
  getPurchase,
  getPurchasebyid,
};

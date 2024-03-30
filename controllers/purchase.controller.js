import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { Purchase } from "./../models/purchase/purchase.model.js";
import { purchaseMappingDetails } from "./../helpers/purchase/purchase_mapping.js";
import { purchaseDetMapping } from "./../helpers/purchase/purchaseDetails_mapping.js";

const addPurchase = asyncHandler(async (req, res) => {
  const newDetails = new Purchase({});
  const mappedDetails = purchaseMappingDetails(newDetails, req.body);
  const mypurchase = await Purchase.create(mappedDetails);
  const createdDetails = await Purchase.findById(mypurchase._id);
  if (!createdDetails) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res
    .status(201)
    .json(
      new ApiResponse(200, createdDetails, "Purchase created successfully")
    );
});
const updatePurchase = asyncHandler(async (req, res) => {
  const updateid = req.params.id;
  const founddetails = await Purchase.findById(updateid);
  if (!founddetails) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    const mappedDetails = purchaseMappingDetails(founddetails, req.body);
    await Purchase.findByIdAndUpdate({ _id: mappedDetails._id }, mappedDetails)
      .then((success) => {
        return res
          .status(201)
          .json(
            new ApiResponse(200, mappedDetails, "Purchase Details updated")
          );
      })
      .catch((err) => {
        throw new ApiError(500, "Something went wrong");
      });
  }
});
const deletePurchase = asyncHandler(async (req, res) => {
  const removalid = req.params.id;
  const founddata = await Purchase.findById(removalid);
  if (!founddata) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    await Purchase.findByIdAndDelete(removalid)
      .then((success) => {
        return res
          .status(201)
          .json(new ApiResponse(200, success, "Purchase Details deleted"));
      })
      .catch((err) => {
        throw new ApiError(500, "Something went wrong");
      });
  }
});
const getPurchase = asyncHandler(async (req, res) => {
  const purchasedata = await Purchase.find().sort({ _id: -1 });
  if (!purchasedata) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, purchasedata, "Purchase Details"));
});
const getPurchasebyid = asyncHandler(async (req, res) => {
  const getid = req.params.id;
  const purchasedata = await Purchase.findById(getid);
  if (!purchasedata) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, purchasedata, "Purchase Details"));
});
export {
  addPurchase,
  updatePurchase,
  deletePurchase,
  getPurchase,
  getPurchasebyid,
};

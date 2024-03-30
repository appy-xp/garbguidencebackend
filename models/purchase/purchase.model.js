import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";

const PurchaseDetailsSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

const PurchaseSchema = new mongoose.Schema(
  {
    itemname: {
      type: String,
      required: true,
    },
    purchaseDetails: [PurchaseDetailsSchema],
  },
  {
    timestamps: true,
  }
);
PurchaseSchema.pre("validate", async function (next) {
  if (this.purchaseDetails.length == 0 || !this.purchaseDetails) {
    return next(new ApiError(401, "Details cannot be null."));
  } else {
    next();
  }
});

export const Purchase = mongoose.model("Purchase", PurchaseSchema);

import mongoose from "mongoose";

const BOMDetailsSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  purchaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Purchase",
  },
});

const BOMSchema = new mongoose.Schema(
  {
    modelName: {
      type: String,
      required: true,
    },
    bomdetails: [BOMDetailsSchema],
  },
  {
    timestamps: true,
  }
);
BOMSchema.pre("validate", async function (next) {
  if (this.bomdetails.length == 0 || !this.bomdetails) {
    return next(new ApiError(401, "Details cannot be null."));
  } else {
    next();
  }
});
export const BOM = mongoose.model("Bom", BOMSchema);

const mongoose = require("mongoose");
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

export const BOM = mongoose.model("Bom", BOMSchema);

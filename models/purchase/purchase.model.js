const mongoose = require("mongoose");

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

const Purchase = mongoose.model("Purchase", PurchaseSchema);

module.exports = Purchase;

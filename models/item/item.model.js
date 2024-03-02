const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    modelName: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sizeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Size",
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    bomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bom",
    },
    statusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;

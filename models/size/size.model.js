const mongoose = require("mongoose");

const SizeSchema = new mongoose.Schema(
  {
    sizeName: {
      type: String,
      required: true,
      unique: true,
    },
    sizeCode: {
      type: String,
      required: true,
    },
    sizeDetail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Size = mongoose.model("Size", SizeSchema);

module.exports = Size;

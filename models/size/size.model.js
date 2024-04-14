import mongoose from "mongoose";

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
const Size1 = mongoose.model("dbo_Size", SizeSchema);

export { Size, Size1 };

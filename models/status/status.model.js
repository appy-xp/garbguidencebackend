import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema(
  {
    isAssigned: {
      type: Boolean,
      enum: [true, false],
      default: true,
      required: true,
    },
    isReceived: {
      type: Boolean,
      enum: [true, false],
      default: false,
      required: true,
    },
    isSteching: {
      type: Boolean,
      enum: [true, false],
      default: false,
      required: true,
    },
    isFinishing: {
      type: Boolean,
      enum: [true, false],
      default: false,
      required: true,
    },
    isPacking: {
      type: Boolean,
      enum: [true, false],
      default: false,
      required: true,
    },
    isDispatched: {
      type: Boolean,
      enum: [true, false],
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Status = mongoose.model("Status", StatusSchema);
const Status1 = mongoose.model("dbo_Status", StatusSchema);

export { Status, Status1 };

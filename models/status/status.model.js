import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema(
  {
    isAssigned: {
      type: Boolean,
      enum: [true, false],
      default: false,
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

export const Status = mongoose.model("Status", StatusSchema);

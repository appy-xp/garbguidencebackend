import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Staff = mongoose.model("Staff", StaffSchema);

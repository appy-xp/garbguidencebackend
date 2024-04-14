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

const Staff = mongoose.model("Staff", StaffSchema);
const Staff1 = mongoose.model("dbo_Staff", StaffSchema);
export { Staff, Staff1 };

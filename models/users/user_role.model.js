import mongoose from "mongoose";

const UserRoleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserRole1 = mongoose.model("Userrole", UserRoleSchema);
const UserRole2 = mongoose.model("dbo_Userrole", UserRoleSchema);
export { UserRole1, UserRole2 };

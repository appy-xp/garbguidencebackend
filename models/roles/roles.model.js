import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
  {
    roles: {
      type: String,
      required: true,
      enum: ["superadmin", "admin", "user", "developer"],
      default: "user",
    },
    role_id: {
      type: Number,
      required: true,
      enum: [1000001, 1000011, 1001111, 1011111],
      default: 1001111,
    },
  },
  {
    timestamps: true,
  }
);

export const Role = mongoose.model("Role", RoleSchema);

import userRouter from "./../routes/users.js";
import brandRouter from "./../routes/brand/brand.js";
import itemRouter from "./../routes/item/item.js";
import roleRouter from "./../routes/roles/roles.js";
import sizeRouter from "./../routes/size/size.js";
import staffRouter from "./../routes/staff/staff.js";
import statusRouter from "./../routes/status/status.js";
import bomRouter from "./../routes/bom/bom.js";
import purchaseRouter from "./../routes/purchase/purchase.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

export default function (app) {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/brand", brandRouter);
  app.use("/api/v1/item", itemRouter);
  app.use("/api/v1/role", roleRouter);
  app.use("/api/v1/size", verifyJWT, sizeRouter);
  app.use("/api/v1/staff", staffRouter);
  app.use("/api/v1/status", statusRouter);
  app.use("/api/v1/bom", bomRouter);
  app.use("/api/v1/purchase", purchaseRouter);
}

var userRouter = require("./../routes/users");
var brandRouter = require("./../routes/brand/brand");
var itemRouter = require("./../routes/item/item");
var roleRouter = require("./../routes/roles/roles");
var sizeRouter = require("./../routes/size/size");
var staffRouter = require("./../routes/staff/staff");
var statusRouter = require("./../routes/status/status");

module.exports = function (app) {
  app.use("/api/user", userRouter);
  app.use("/api/brand", brandRouter);
  app.use("/api/item", itemRouter);
  app.use("/api/role", roleRouter);
  app.use("/api/size", sizeRouter);
  app.use("/api/staff", staffRouter);
  app.use("/api/status", statusRouter);
};

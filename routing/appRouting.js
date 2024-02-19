var userRouter = require("./../routes/users");

module.exports = function (app) {
  app.use("/user", userRouter);
};

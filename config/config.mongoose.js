var mongoose = require("mongoose");
var config = require("./index");
var localUrl = config.dbUrl + "/" + config.dbName;

try {
  mongoose.connect(localUrl);
  console.log("DB connection success");
} catch (err) {
  console.log("connection success to db");
}

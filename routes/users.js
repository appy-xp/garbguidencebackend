var express = require("express");
var router = express.Router();

var UserModel = require("./../models/users/user.model");
var RolesModel = require("./../models/roles/roles.model");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;

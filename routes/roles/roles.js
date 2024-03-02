var express = require("express");
var router = express.Router();
var roleModel = require("./../../models/roles/roles.model");
var mapRole = require("./../../helpers/roles/role_mapping");

router
  .route("/")
  .get(function (req, res, next) {
    roleModel.aggregate([{ $sort: { _id: -1 } }], function (err, address) {
      if (err) {
        return next(err);
      }
      res.status(200).json(address);
    });
  })
  .post(function (req, res, next) {
    var newRole = new roleModel({});
    var mappedRole = mapRole(newRole, req.body);
    mappedRole.save(function (err, saved) {
      if (err) {
        return next(err);
      }
      res.status(200).json(saved);
    });
  });

router
  .route("/:id")
  .get(function (req, res, next) {
    var roleid = req.params.id;

    roleModel.findById(roleid, function (err, roles) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(roles);
      }
    });
  })
  .put(function (req, res, next) {
    var roleid = req.params.id;
    roleModel.findById(roleid, function (err, roles) {
      if (err) {
        return next(err);
      }
      if (roles) {
        var updatedroles = mapRole(roles, req.body);
        updatedroles.save(function (err, updated) {
          if (err) {
            return next(err);
          }
          res.status(200).json(updated);
        });
      } else {
        next({
          message: "items not found",
          status: 400,
        });
      }
    });
  })
  .delete(function (req, res, next) {
    var roleid = req.params.id;
    roleModel.findByIdAndDelete(roleid, function (err, roles) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(roles);
      }
    });
  });

module.exports = router;

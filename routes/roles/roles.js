import { Router } from "express";
import { Role } from "./../../models/roles/roles.model.js";
import { roleMappingDetails } from "./../../helpers/roles/role_mapping.js";
const router = Router();

router
  .route("/")
  .get(function (req, res, next) {
    Role.aggregate([{ $sort: { _id: -1 } }], function (err, address) {
      if (err) {
        return next(err);
      }
      res.status(200).json(address);
    });
  })
  .post(function (req, res, next) {
    var newRole = new Role({});
    var mappedRole = roleMappingDetails(newRole, req.body);
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

    Role.findById(roleid, function (err, roles) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(roles);
      }
    });
  })
  .put(function (req, res, next) {
    var roleid = req.params.id;
    Role.findById(roleid, function (err, roles) {
      if (err) {
        return next(err);
      }
      if (roles) {
        var updatedroles = roleMappingDetails(roles, req.body);
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
    Role.findByIdAndDelete(roleid, function (err, roles) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(roles);
      }
    });
  });

export default router;

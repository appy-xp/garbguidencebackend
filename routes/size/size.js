import { Router } from "express";
import { Size } from "./../../models/size/size.model.js";
import { sizeMappingDetails } from "./../../helpers/size/size_mapping.js";
const router = Router();
router
  .route("/")
  .get(function (req, res, next) {
    Size.aggregate([{ $sort: { _id: -1 } }], function (err, saved) {
      if (err) {
        return next(err);
      }
      res.status(200).json(saved);
    });
  })
  .post(function (req, res, next) {
    var newData = new Size({});
    var mappedData = sizeMappingDetails(newData, req.body);
    mappedData.save(function (err, saved) {
      if (err) {
        return next(err);
      }
      res.status(200).json(saved);
    });
  });

router
  .route("/:id")
  .get(function (req, res, next) {
    var dataid = req.params.id;

    Size.findById(dataid, function (err, saved) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(saved);
      }
    });
  })
  .put(function (req, res, next) {
    var dataid = req.params.id;
    Size.findById(dataid, function (err, saved) {
      if (err) {
        return next(err);
      }
      if (saved) {
        var updateddata = sizeMappingDetails(saved, req.body);
        updateddata.save(function (err, updated) {
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
    var dataid = req.params.id;
    Size.findByIdAndDelete(dataid, function (err, saved) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(saved);
      }
    });
  });

export default router;

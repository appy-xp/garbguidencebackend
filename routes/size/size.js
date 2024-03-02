var express = require("express");
var router = express.Router();
var sizeModel = require("./../../models/size/size.model");
var mapSize = require("./../../helpers/size/size_mapping");

router
  .route("/")
  .get(function (req, res, next) {
    sizeModel.aggregate([{ $sort: { _id: -1 } }], function (err, saved) {
      if (err) {
        return next(err);
      }
      res.status(200).json(saved);
    });
  })
  .post(function (req, res, next) {
    var newData = new sizeModel({});
    var mappedData = mapSize(newData, req.body);
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

    sizeModel.findById(dataid, function (err, saved) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(saved);
      }
    });
  })
  .put(function (req, res, next) {
    var dataid = req.params.id;
    sizeModel.findById(dataid, function (err, saved) {
      if (err) {
        return next(err);
      }
      if (saved) {
        var updateddata = mapSize(saved, req.body);
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
    sizeModel.findByIdAndDelete(dataid, function (err, saved) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(saved);
      }
    });
  });

module.exports = router;

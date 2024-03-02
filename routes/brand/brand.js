var express = require("express");
var router = express.Router();
var brandModel = require("./../../models/brand/brand.model");
var mapBrand = require("./../../helpers/brand/brand_mapping");

router
  .route("/")
  .get(function (req, res, next) {
    brandModel.aggregate([{ $sort: { _id: -1 } }], function (err, address) {
      if (err) {
        return next(err);
      }
      res.status(200).json(address);
    });
  })
  .post(function (req, res, next) {
    var newBrand = new brandModel({});
    var mappedBrand = mapBrand(newBrand, req.body);
    mappedBrand.save(function (err, saved) {
      if (err) {
        return next(err);
      }
      res.status(200).json(saved);
    });
  });

router
  .route("/:id")
  .get(function (req, res, next) {
    var brandid = req.params.id;

    brandModel.findById(brandid, function (err, brand) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(brand);
      }
    });
  })
  .put(function (req, res, next) {
    var brandid = req.params.id;
    brandModel.findById(brandid, function (err, brand) {
      if (err) {
        return next(err);
      }
      if (brand) {
        var updatedbrand = mapBrand(brand, req.body);
        updatedbrand.save(function (err, updated) {
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
    var brandid = req.params.id;
    brandModel.findByIdAndDelete(brandid, function (err, brand) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(brand);
      }
    });
  });

module.exports = router;

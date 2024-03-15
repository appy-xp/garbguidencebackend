import { Router } from "express";
import { Brand } from "./../../models/brand/brand.model.js";
import { brandMappingDetails } from "./../../helpers/brand/brand_mapping.js";
const router = Router();
import { ApiResponse } from "./../../utils/ApiResponse.js";

router
  .route("/")
  .get(async function (req, res, next) {
    const branddetails = await Brand.aggregate([{ $sort: { _id: -1 } }]);
    return res.status(201).json(new ApiResponse(200, branddetails, "Details"));
  })
  .post(function (req, res, next) {
    var newBrand = new brandModel({});
    var mappedBrand = brandMappingDetails(newBrand, req.body);
    mappedBrand.save(function (err, saved) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.status(200).json(saved);
    });
  });

router
  .route("/:id")
  .get(function (req, res, next) {
    var brandid = req.params.id;

    Brand.findById(brandid, function (err, brand) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(brand);
      }
    });
  })
  .put(function (req, res, next) {
    var brandid = req.params.id;
    Brand.findById(brandid, function (err, brand) {
      if (err) {
        return next(err);
      }
      if (brand) {
        var updatedbrand = brandMappingDetails(brand, req.body);
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
    Brand.findByIdAndDelete(brandid, function (err, brand) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(brand);
      }
    });
  });

export default router;

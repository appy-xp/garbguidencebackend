import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { Brand } from "./../models/brand/brand.model.js";
import { brandMappingDetails } from "./../helpers/brand/brand_mapping.js";

const addBrands = asyncHandler(async (req, res) => {
  const newDetails = new Brand({});
  const mappedDetails = brandMappingDetails(newDetails, req.body);
  const size = await Brand.create(mappedDetails);
  const createdDetails = await Brand.findById(size._id);
  if (!createdDetails) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdDetails, "Brand created successfully"));
});
const updateBrands = asyncHandler(async (req, res) => {
  const updateid = req.params.id;
  const founddetails = await Brand.findById(updateid);
  if (!founddetails) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    const mappedDetails = brandMappingDetails(founddetails, req.body);
    await Brand.findByIdAndUpdate({ _id: mappedDetails._id }, mappedDetails)
      .then((success) => {
        return res
          .status(201)
          .json(new ApiResponse(200, mappedDetails, "Brand Details updated"));
      })
      .catch((err) => {
        throw new ApiError(500, "Something went wrong");
      });
  }
});
const removeBrands = asyncHandler(async (req, res) => {
  const removalid = req.params.id;
  const founddata = await Brand.findById(removalid);
  if (!founddata) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    await Brand.findByIdAndDelete(removalid)
      .then((success) => {
        return res
          .status(201)
          .json(new ApiResponse(200, success, "Brand Details deleted"));
      })
      .catch((err) => {
        throw new ApiError(500, "Something went wrong");
      });
  }
});
const getBrand = asyncHandler(async (req, res) => {
  const branddata = await Brand.find().sort({ _id: -1 });
  if (!branddata) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res.status(201).json(new ApiResponse(200, branddata, "Brand Details"));
});
const getBrandbyid = asyncHandler(async (req, res) => {
  const getid = req.params.id;
  const branddata = await Brand.findById(getid);
  if (!branddata) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res.status(201).json(new ApiResponse(200, branddata, "Brand Details"));
});

export { addBrands, updateBrands, removeBrands, getBrand, getBrandbyid };

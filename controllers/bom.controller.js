import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { BOM } from "./../models/bom/bom.model.js";
import { bomMappingDetails } from "./../helpers/bom/bom_mapping.js";
import { bomMappingDeta } from "./../helpers/bom/bomdetails_mapping.js";

const addBom = asyncHandler(async (req, res) => {
  const newDetails = new BOM({});
  const mappedDetails = bomMappingDetails(newDetails, req.body);
  const myBOM = await BOM.create(mappedDetails);
  const createdDetails = await BOM.findById(myBOM._id);
  if (!createdDetails) {
    throw new ApiError(500, "Something went wrong while registering BOM.");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdDetails, "BOM created successfully"));
});
const updateBom = asyncHandler(async (req, res) => {
  const updateid = req.params.id;
  const founddetails = await BOM.findById(updateid);
  if (!founddetails) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    const mappedDetails = bomMappingDetails(founddetails, req.body);
    await BOM.findByIdAndUpdate({ _id: mappedDetails._id }, mappedDetails)
      .then((success) => {
        return res
          .status(201)
          .json(new ApiResponse(200, mappedDetails, "BOM Details updated"));
      })
      .catch((err) => {
        throw new ApiError(500, "Something went wrong");
      });
  }
});
const deleteBom = asyncHandler(async (req, res) => {
  const removalid = req.params.id;
  const founddata = await Purchase.findById(removalid);
  if (!founddata) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    await BOM.findByIdAndDelete(removalid)
      .then((success) => {
        return res
          .status(201)
          .json(new ApiResponse(200, success, "BOM Details deleted"));
      })
      .catch((err) => {
        throw new ApiError(500, "Something went wrong");
      });
  }
});
const getBom = asyncHandler(async (req, res) => {
  const bomData = await BOM.find().sort({ _id: -1 });
  if (!bomData) {
    throw new ApiError(500, "Something went wrong while registering BOM.");
  }
  return res.status(201).json(new ApiResponse(200, bomData, "BOM Details"));
});
const getBombyid = asyncHandler(async (req, res) => {
  const getid = req.params.id;
  const bomData = await BOM.findById(getid);
  if (!bomData) {
    throw new ApiError(500, "Something went wrong while registering BOM.");
  }
  return res.status(201).json(new ApiResponse(200, bomData, "BOM Details"));
});
export { addBom, updateBom, deleteBom, getBom, getBombyid };

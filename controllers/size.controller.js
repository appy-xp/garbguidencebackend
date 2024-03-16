import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { Size } from "./../models/size/size.model.js";
import { sizeMappingDetails } from "./../helpers/size/size_mapping.js";

const addSize = asyncHandler(async (req, res) => {
  const newDetails = new Size({});
  const mappedDetails = sizeMappingDetails(newDetails, req.body);
  const size = await Size.create(mappedDetails);
  const createdDetails = await Size.findById(size._id).select("-sizeDetail");
  if (!createdDetails) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdDetails, "Size created successfully"));
});
const updateSize = asyncHandler(async (req, res) => {
  const updateid = req.params.id;
  const founddetails = await Size.findById(updateid);
  if (!founddetails) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    const mappedDetails = sizeMappingDetails(founddetails, req.body);
    await Size.findByIdAndUpdate({ _id: mappedDetails._id }, mappedDetails)
      .then((success) => {
        return res
          .status(201)
          .json(new ApiResponse(200, mappedDetails, "Size Details updated"));
      })
      .catch((err) => {
        throw new ApiError(500, "Something went wrong");
      });
  }
});
const removeSize = asyncHandler(async (req, res) => {
  const removalid = req.params.id;
  const founddata = await Size.findById(removalid);
  if (!founddata) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    await Size.findByIdAndDelete(removalid)
      .then((success) => {
        return res
          .status(201)
          .json(new ApiResponse(200, success, "Size Details deleted"));
      })
      .catch((err) => {
        throw new ApiError(500, "Something went wrong");
      });
  }
});
const getSize = asyncHandler(async (req, res) => {
  const sizedata = await Size.find().sort({ _id: -1 });
  if (!sizedata) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res.status(201).json(new ApiResponse(200, sizedata, "Size Details"));
});
const getSizebyid = asyncHandler(async (req, res) => {
  const getid = req.params.id;
  const sizedata = await Size.findById(getid);
  if (!sizedata) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res.status(201).json(new ApiResponse(200, sizedata, "Size Details"));
});

export { addSize, updateSize, removeSize, getSize, getSizebyid };

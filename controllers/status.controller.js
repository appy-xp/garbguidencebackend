import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { Status } from "./../models/status/status.model.js";
import { statusMappingDetails } from "./../helpers/status/status_mapping.js";

const addStatus = asyncHandler(async (req, res) => {
  const newDetails = new Status({});
  const mappedDetails = statusMappingDetails(newDetails, req.body);
  const size = await Status.create(mappedDetails);
  const createdDetails = await Status.findById(size._id);
  if (!createdDetails) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdDetails, "Status created successfully"));
});
const updateStatus = asyncHandler(async (req, res) => {
  const updateid = req.params.id;
  const founddetails = await Status.findById(updateid);
  if (!founddetails) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    const mappedDetails = statusMappingDetails(founddetails, req.body);
    await Status.findByIdAndUpdate({ _id: mappedDetails._id }, mappedDetails)
      .then((success) => {
        return res
          .status(201)
          .json(new ApiResponse(200, mappedDetails, "Status Details updated"));
      })
      .catch((err) => {
        throw new ApiError(500, "Something went wrong");
      });
  }
});
const deleteStatus = asyncHandler(async (req, res) => {
  const removalid = req.params.id;
  const founddata = await Status.findById(removalid);
  if (!founddata) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    await Status.findByIdAndDelete(removalid)
      .then((success) => {
        return res
          .status(201)
          .json(new ApiResponse(200, success, "Status Details deleted"));
      })
      .catch((err) => {
        throw new ApiError(500, "Something went wrong");
      });
  }
});
const getStatus = asyncHandler(async (req, res) => {
  const statusdata = await Status.find().sort({ _id: -1 });
  if (!statusdata) {
    throw new ApiError(500, "Something went wrong while registering Status.");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, statusdata, "Status Details"));
});
const getStatusbyid = asyncHandler(async (req, res) => {
  const getid = req.params.id;
  const statusdata = await Status.findById(getid);
  if (!statusdata) {
    throw new ApiError(500, "Something went wrong while registering Status.");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, statusdata, "Status Details"));
});

export { addStatus, updateStatus, deleteStatus, getStatus, getStatusbyid };

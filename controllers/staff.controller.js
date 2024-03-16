import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { Staff } from "./../models/staff/staff.model.js";
import { staffMappingDetails } from "./../helpers/staff/staff_mapping.js";

const addStaff = asyncHandler(async (req, res) => {
  const newDetails = new Staff({});
  const mappedDetails = staffMappingDetails(newDetails, req.body);
  const staff = await Staff.create(mappedDetails);
  const createdDetails = await Staff.findById(staff._id).select("-statusId");
  if (!createdDetails) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdDetails, "Staff created successfully"));
});
const updateStaff = asyncHandler(async (req, res) => {
  const updateid = req.params.id;
  const founddetails = await Staff.findById(updateid);
  if (!founddetails) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    const mappedDetails = staffMappingDetails(founddetails, req.body);
    await Staff.findByIdAndUpdate({ _id: mappedDetails._id }, mappedDetails)
      .then((success) => {
        return res
          .status(201)
          .json(new ApiResponse(200, mappedDetails, "Staff Details updated"));
      })
      .catch((err) => {
        throw new ApiError(500, "Something went wrong");
      });
  }
});
const removeStaff = asyncHandler(async (req, res) => {
  const removalid = req.params.id;
  const founddata = await Staff.findById(removalid);
  if (!founddata) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    await Staff.findByIdAndDelete(removalid)
      .then((success) => {
        return res
          .status(201)
          .json(new ApiResponse(200, success, "Staff Details deleted"));
      })
      .catch((err) => {
        throw new ApiError(500, "Something went wrong");
      });
  }
});
const getStaff = asyncHandler(async (req, res) => {
  const staffdata = await Staff.find().sort({ _id: -1 });
  if (!staffdata) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res.status(201).json(new ApiResponse(200, staffdata, "Staff Details"));
});

export { addStaff, updateStaff, removeStaff, getStaff };

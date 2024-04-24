import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { Staff, Staff1 } from "./../models/staff/staff.model.js";
import { staffMappingDetails } from "./../helpers/staff/staff_mapping.js";
import assert from "assert";

const addStaff = asyncHandler(async (req, res) => {
  let session = null;
  const newDetails = new Staff({});
  const mappedDetails = staffMappingDetails(newDetails, req.body);
  return Staff.createCollection()
    .then(async () => await Staff.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      await Staff1.create([mappedDetails], { session: session });
      return Staff.create([mappedDetails], { session: session });
    })
    .then((sizedet) => Staff.findById(sizedet[0]._id).session(session))
    .then((doc) => assert.ok(doc))
    .then(() => session.commitTransaction())
    .then(() => Staff.findById(mappedDetails._id))
    .then((doc) => assert.ok(doc))
    .then(() => session.endSession())
    .then(() =>
      res
        .status(201)
        .json(new ApiResponse(200, {}, "Size created successfully"))
    )
    .catch((err) => {
      session.abortTransaction();

      throw new ApiError(500, "Something went wrong while registering User.");
    });
});
const updateStaff = asyncHandler(async (req, res) => {
  const updateid = req.params.id;
  const founddetails = await Staff.findById(updateid);
  let session = null;
  if (!founddetails) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    const mappedDetails = staffMappingDetails(founddetails, req.body);
    return Staff.createCollection()
      .then(async () => await Staff.startSession())
      .then(async (_session) => {
        session = _session;
        session.startTransaction();
        await Staff1.findByIdAndUpdate(
          { _id: mappedDetails._id },
          mappedDetails
        ).session(session);
        return Staff.findByIdAndUpdate(
          { _id: mappedDetails._id },
          mappedDetails
        ).session(session);
      })
      .then((doc) => assert.ok(doc))
      .then(() => session.commitTransaction())
      .then(() => session.endSession())
      .then(() =>
        res.status(201).json(new ApiResponse(200, {}, "Size Details deleted"))
      )
      .catch((err) => {
        session.abortTransaction();

        throw new ApiError(500, "Something went wrong while deleting Size.");
      });
  }
});
const removeStaff = asyncHandler(async (req, res) => {
  const removalid = req.params.id;
  const founddata = await Staff.findById(removalid);
  let session = null;
  if (!founddata) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    return Staff.createCollection()
      .then(async () => await Staff.startSession())
      .then(async (_session) => {
        session = _session;
        session.startTransaction();
        await Staff1.findByIdAndDelete(removalid).session(session);
        return Staff.findByIdAndDelete(removalid).session(session);
      })
      .then((doc) => assert.ok(doc))
      .then(() => session.commitTransaction())
      .then(() => session.endSession())
      .then(() =>
        res.status(201).json(new ApiResponse(200, {}, "Size Details deleted"))
      )
      .catch((err) => {
        session.abortTransaction();

        throw new ApiError(500, "Something went wrong while deleting Size.");
      });
  }
});
const getStaff = asyncHandler(async (req, res) => {
  let session = null;
  return Staff.createCollection()
    .then(async () => await Staff.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      const sizedet = await Staff.find().sort({ _id: -1 }).session(session);
      const sizedupdet = await Staff1.find().sort({ _id: -1 }).session(session);
      if (sizedet.length || sizedupdet.length) {
        return sizedet;
      } else {
        throw new ApiError(500, "Something went wrong ");
      }
    })
    .then((doc) => assert.ok(doc))
    .then(() => session.commitTransaction())
    .then(() => session.endSession())
    .then(() => Staff.find().sort({ _id: -1 }))
    .then((det) =>
      res
        .status(201)
        .json(new ApiResponse(200, det, "Size details successfully"))
    )
    .catch((err) => {
      session.abortTransaction();

      throw new ApiError(500, "Something went wrong while registering User.");
    });
});
const getStaffbyid = asyncHandler(async (req, res) => {
  const getid = req.params.id;
  const staffdata = await Staff.findById(getid);
  if (!staffdata) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res.status(201).json(new ApiResponse(200, staffdata, "Staff Details"));
});
const gettotalStaffs = asyncHandler(async (req, res) => {
  const staffdata = await Staff.find().countDocuments();
  if (!staffdata) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res.status(201).json(new ApiResponse(200, staffdata, "Staff Details"));
});

export {
  addStaff,
  updateStaff,
  removeStaff,
  getStaff,
  getStaffbyid,
  gettotalStaffs,
};

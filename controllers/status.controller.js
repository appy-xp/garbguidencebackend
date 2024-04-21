import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { Status, Status1 } from "./../models/status/status.model.js";
import { statusMappingDetails } from "./../helpers/status/status_mapping.js";
import assert from "assert";

const addStatus = asyncHandler(async (req, res) => {
  let session = null;
  const newDetails = new Status({});
  const mappedDetails = statusMappingDetails(newDetails, req.body);

  return Status.createCollection()
    .then(async () => await Status.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      await Status1.create([mappedDetails], { session: session });
      return Status.create([mappedDetails], { session: session });
    })
    .then((sizedet) => Status.findById(sizedet[0]._id).session(session))
    .then((doc) => assert.ok(doc))
    .then(() => session.commitTransaction())
    .then(() => Status.findById(mappedDetails._id))
    .then((doc) => assert.ok(doc))
    .then(() => session.endSession())
    .then(() =>
      res
        .status(201)
        .json(new ApiResponse(200, {}, "Size created successfully"))
    )
    .catch((err) => {
      session.abortTransaction();
      console.log("error is>>", err);
      throw new ApiError(500, "Something went wrong while registering User.");
    });
  // const size = await Status.create(mappedDetails);
  // const createdDetails = await Status.findById(size._id);
  // if (!createdDetails) {
  //   throw new ApiError(500, "Something went wrong while registering User.");
  // }
  // return res
  //   .status(201)
  //   .json(new ApiResponse(200, createdDetails, "Status created successfully"));
});
const updateStatus = asyncHandler(async (req, res) => {
  const updateid = req.params.id;
  const founddetails = await Status.findById(updateid);
  let session = null;
  if (!founddetails) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    const mappedDetails = statusMappingDetails(founddetails, req.body);
    return Status.createCollection()
      .then(async () => await Status.startSession())
      .then(async (_session) => {
        session = _session;
        session.startTransaction();
        await Status1.findByIdAndUpdate(
          { _id: mappedDetails._id },
          mappedDetails
        ).session(session);
        return Status.findByIdAndUpdate(
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
        console.log("error is>>", err);
        throw new ApiError(500, "Something went wrong while deleting Size.");
      });
    // await Status.findByIdAndUpdate({ _id: mappedDetails._id }, mappedDetails)
    //   .then((success) => {
    //     return res
    //       .status(201)
    //       .json(new ApiResponse(200, mappedDetails, "Status Details updated"));
    //   })
    //   .catch((err) => {
    //     throw new ApiError(500, "Something went wrong");
    //   });
  }
});
const deleteStatus = asyncHandler(async (req, res) => {
  const removalid = req.params.id;
  const founddata = await Status.findById(removalid);
  let session = null;
  if (!founddata) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    return Status.createCollection()
      .then(async () => await Status.startSession())
      .then(async (_session) => {
        session = _session;
        session.startTransaction();
        await Status1.findByIdAndDelete(removalid).session(session);
        return Status.findByIdAndDelete(removalid).session(session);
      })
      .then((doc) => assert.ok(doc))
      .then(() => session.commitTransaction())
      .then(() => session.endSession())
      .then(() =>
        res.status(201).json(new ApiResponse(200, {}, "Size Details deleted"))
      )
      .catch((err) => {
        session.abortTransaction();
        console.log("error is>>", err);
        throw new ApiError(500, "Something went wrong while deleting Size.");
      });
    // await Status.findByIdAndDelete(removalid)
    //   .then((success) => {
    //     return res
    //       .status(201)
    //       .json(new ApiResponse(200, success, "Status Details deleted"));
    //   })
    //   .catch((err) => {
    //     throw new ApiError(500, "Something went wrong");
    //   });
  }
});
const getStatus = asyncHandler(async (req, res) => {
  let session = null;
  return Status.createCollection()
    .then(async () => await Status.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      const sizedet = await Status.find().sort({ _id: -1 }).session(session);
      const sizedupdet = await Status1.find()
        .sort({ _id: -1 })
        .session(session);
      if (sizedet.length || sizedupdet.length) {
        return sizedet;
      } else {
        throw new ApiError(500, "Something went wrong ");
      }
    })
    .then((doc) => assert.ok(doc))
    .then(() => session.commitTransaction())
    .then(() => session.endSession())
    .then(() => Status.find().sort({ _id: -1 }))
    .then((det) =>
      res
        .status(201)
        .json(new ApiResponse(200, det, "Size details successfully"))
    )
    .catch((err) => {
      session.abortTransaction();
      console.log("error is>>", err);
      throw new ApiError(500, "Something went wrong while registering User.");
    });
  // const statusdata = await Status.find().sort({ _id: -1 });
  // if (!statusdata) {
  //   throw new ApiError(500, "Something went wrong while registering Status.");
  // }
  // return res
  //   .status(201)
  //   .json(new ApiResponse(200, statusdata, "Status Details"));
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

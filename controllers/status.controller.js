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

      throw new ApiError(500, "Something went wrong while registering User.");
    });
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

        throw new ApiError(500, "Something went wrong while deleting Size.");
      });
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

        throw new ApiError(500, "Something went wrong while deleting Size.");
      });
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

      throw new ApiError(500, "Something went wrong while registering User.");
    });
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

const getitemStatus = asyncHandler(async (req, res) => {
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
    .then(() =>
      Status.aggregate([
        { $sort: { _id: -1 } },
        {
          $lookup: {
            from: "items",
            localField: "_id",
            foreignField: "statusId",
            as: "itemdata",
          },
        },
      ])
    )
    .then((det) => {
      {
        const dataToSend = det.map((e) => {
          e.name = e.itemdata[0].itemName;
          if (e.isAssigned) {
            e.assignedlogo = `<i class="fa-solid fa-circle-check"
              style="background-color:green"
            ></i>`;
          } else {
            e.assignedlogo = `<i
              class="fa-solid fa-check"
              style="background-color:lightgray"
            ></i>`;
          }
          return e;
        });
        res
          .status(201)
          .json(new ApiResponse(200, dataToSend, "Size details successfully"));
      }
    })
    .catch((err) => {
      session.abortTransaction();

      throw new ApiError(500, "Something went wrong while registering User.");
    });
});
const getfinished = asyncHandler(async (req, res) => {
  const statusdata = await Status.findOne({
    isDispatched: true,
  }).countDocuments();
  if (!statusdata) {
    throw new ApiError(500, "Something went wrong while registering Status.");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, statusdata, "Status Details"));
});

export {
  addStatus,
  updateStatus,
  deleteStatus,
  getStatus,
  getStatusbyid,
  getitemStatus,
  getfinished,
};

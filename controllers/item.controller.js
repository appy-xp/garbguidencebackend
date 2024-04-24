import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { Item, Item1 } from "./../models/item/item.model.js";
import { itemMappingDetails } from "./../helpers/item/item_mapping.js";
import assert from "assert";
import { Status, Status1 } from "./../models/status/status.model.js";
import { statusMappingDetails } from "./../helpers/status/status_mapping.js";

const addItem = asyncHandler(async (req, res) => {
  let session = null;
  const newDetails = new Item({});
  const mappedDetails = itemMappingDetails(newDetails, req.body);
  const newStatusDetails = new Status1({});
  const mappedStatusDetails = statusMappingDetails(newStatusDetails, {});
  mappedDetails.statusId = mappedStatusDetails._id;
  return Item.createCollection()
    .then(async () => await Item.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      await Item1.create([mappedDetails], { session: session });
      await Status.create([mappedStatusDetails], { session: session });
      await Status1.create([mappedStatusDetails], { session: session });
      return Item.create([mappedDetails], { session: session });
    })
    .then((sizedet) => Item.findById(sizedet[0]._id).session(session))
    .then((doc) => assert.ok(doc))
    .then(() => session.commitTransaction())
    .then(() => Item.findById(mappedDetails._id))
    .then((doc) => assert.ok(doc))
    .then(() => session.endSession())
    .then(() =>
      res
        .status(201)
        .json(new ApiResponse(200, {}, "Item created successfully"))
    )
    .catch((err) => {
      session.abortTransaction();

      throw new ApiError(500, "Something went wrong while Item.");
    });
});
const updateItem = asyncHandler(async (req, res) => {
  const updateid = req.params.id;
  const founddetails = await Item.findById(updateid);
  let session = null;
  if (!founddetails) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    const mappedDetails = itemMappingDetails(founddetails, req.body);
    return Item.createCollection()
      .then(async () => await Item.startSession())
      .then(async (_session) => {
        session = _session;
        session.startTransaction();
        await Item1.findByIdAndUpdate(
          { _id: mappedDetails._id },
          mappedDetails
        ).session(session);
        return Item.findByIdAndUpdate(
          { _id: mappedDetails._id },
          mappedDetails
        ).session(session);
      })
      .then((doc) => assert.ok(doc))
      .then(() => session.commitTransaction())
      .then(() => session.endSession())
      .then(() =>
        res.status(201).json(new ApiResponse(200, {}, "Item Details deleted"))
      )
      .catch((err) => {
        session.abortTransaction();

        throw new ApiError(500, "Something went wrong while deleting Item.");
      });
  }
});
const removeItem = asyncHandler(async (req, res) => {
  const removalid = req.params.id;
  const founddata = await Item.findById(removalid);
  let session = null;
  if (!founddata) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    return Item.createCollection()
      .then(async () => await Item.startSession())
      .then(async (_session) => {
        session = _session;
        session.startTransaction();
        await Item1.findByIdAndDelete(removalid).session(session);
        return Item.findByIdAndDelete(removalid).session(session);
      })
      .then((doc) => assert.ok(doc))
      .then(() => session.commitTransaction())
      .then(() => session.endSession())
      .then(() =>
        res.status(201).json(new ApiResponse(200, {}, "Item Details deleted"))
      )
      .catch((err) => {
        session.abortTransaction();

        throw new ApiError(500, "Something went wrong while deleting Item.");
      });
  }
});
const getItem = asyncHandler(async (req, res) => {
  let session = null;
  return Item.createCollection()
    .then(async () => await Item.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      const sizedet = await Item.find().sort({ _id: -1 }).session(session);
      const sizedupdet = await Item1.find().sort({ _id: -1 }).session(session);
      if (sizedet.length || sizedupdet.length) {
        return sizedet;
      } else {
        throw new ApiError(500, "Something went wrong ");
      }
    })
    .then((doc) => assert.ok(doc))
    .then(() => session.commitTransaction())
    .then(() => session.endSession())
    .then(() => Item.find().sort({ _id: -1 }))
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
const getItembyid = asyncHandler(async (req, res) => {
  const getid = req.params.id;
  const itemdata = await Item.findById(getid);
  if (!itemdata) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res.status(201).json(new ApiResponse(200, itemdata, "Item Details"));
});
const getStaffItem = asyncHandler(async (req, res) => {
  let session = null;
  return Item.createCollection()
    .then(async () => await Item.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      const sizedet = await Item.find().sort({ _id: -1 }).session(session);
      const sizedupdet = await Item1.find().sort({ _id: -1 }).session(session);
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
      Item.aggregate([
        { $sort: { _id: -1 } },
        {
          $lookup: {
            from: "staffs",
            localField: "staffId",
            foreignField: "_id",
            as: "staffitem",
          },
        },
        {
          $lookup: {
            from: "boms",
            localField: "bomId",
            foreignField: "_id",
            as: "bomitem",
          },
        },
      ])
    )
    .then((det) => {
      const dataToSend = det.map((e) => {
        e.staffname = e.staffitem[0].firstName + " " + e.staffitem[0].lastName;
        e.bomName = e.bomitem[0].modelName;
        return e;
      });
      res
        .status(201)
        .json(new ApiResponse(200, dataToSend, "Size details successfully"));
    })
    .catch((err) => {
      session.abortTransaction();

      throw new ApiError(500, "Something went wrong while registering User.");
    });
});
const getpendingItems = asyncHandler(async (req, res) => {
  let session = null;
  return Item.createCollection()
    .then(async () => await Item.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      const sizedet = await Item.find().sort({ _id: -1 }).session(session);
      const sizedupdet = await Item1.find().sort({ _id: -1 }).session(session);
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
      Item.aggregate([
        { $sort: { _id: -1 } },
        {
          $lookup: {
            from: "brands",
            localField: "brandId",
            foreignField: "_id",
            as: "branddet",
          },
        },
        {
          $lookup: {
            from: "sizes",
            localField: "sizeId",
            foreignField: "_id",
            as: "sizedet",
          },
        },
        {
          $lookup: {
            from: "status",
            localField: "statusId",
            foreignField: "_id",
            as: "statusdet",
          },
        },
        { $match: { "statusdet.isDispatched": false } },
      ])
    )
    .then(async (det) =>
      res.status(201).json(new ApiResponse(200, det, "Pending item list"))
    )
    .catch((err) => {
      session.abortTransaction();

      throw new ApiError(500, "Something went wrong while registering User.");
    });
});
const getcompletedItems = asyncHandler(async (req, res) => {
  let session = null;
  return Item.createCollection()
    .then(async () => await Item.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      const sizedet = await Item.find().sort({ _id: -1 }).session(session);
      const sizedupdet = await Item1.find().sort({ _id: -1 }).session(session);
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
      Item.aggregate([
        { $sort: { _id: -1 } },
        {
          $lookup: {
            from: "brands",
            localField: "brandId",
            foreignField: "_id",
            as: "branddet",
          },
        },
        {
          $lookup: {
            from: "sizes",
            localField: "sizeId",
            foreignField: "_id",
            as: "sizedet",
          },
        },
        {
          $lookup: {
            from: "status",
            localField: "statusId",
            foreignField: "_id",
            as: "statusdet",
          },
        },
        { $match: { "statusdet.isDispatched": true } },
      ])
    )
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

export {
  addItem,
  updateItem,
  removeItem,
  getItem,
  getItembyid,
  getStaffItem,
  getpendingItems,
  getcompletedItems,
};

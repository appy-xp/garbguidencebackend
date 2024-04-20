import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { Size, Size1 } from "./../models/size/size.model.js";
import { sizeMappingDetails } from "./../helpers/size/size_mapping.js";
import assert from "assert";

const addSize = asyncHandler(async (req, res) => {
  let session = null;
  const newDetails = new Size({});
  const mappedDetails = sizeMappingDetails(newDetails, req.body);
  return Size.createCollection()
    .then(async () => await Size.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      await Size1.create([mappedDetails], { session: session });
      return Size.create([mappedDetails], { session: session });
    })
    .then((sizedet) => Size.findById(sizedet[0]._id).session(session))
    .then((doc) => assert.ok(doc))
    .then(() => session.commitTransaction())
    .then(() => Size.findById(mappedDetails._id))
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

  // const createdDetails = await Size.findById(size._id).select("-sizeDetail");
  // if (!createdDetails) {
  //   throw new ApiError(500, "Something went wrong while registering User.");
  // }
  // return res
  //   .status(201)
  //   .json(new ApiResponse(200, createdDetails, "Size created successfully"));
});
const updateSize = asyncHandler(async (req, res) => {
  const updateid = req.params.id;
  const founddetails = await Size.findById(updateid);
  let session = null;
  if (!founddetails) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    const mappedDetails = sizeMappingDetails(founddetails, req.body);

    return Size.createCollection()
      .then(async () => await Size.startSession())
      .then(async (_session) => {
        session = _session;
        session.startTransaction();
        await Size1.findByIdAndUpdate(
          { _id: mappedDetails._id },
          mappedDetails
        ).session(session);
        return Size.findByIdAndUpdate(
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

    // await Size.findByIdAndUpdate({ _id: mappedDetails._id }, mappedDetails)
    //   .then((success) => {
    //     return res
    //       .status(201)
    //       .json(new ApiResponse(200, mappedDetails, "Size Details updated"));
    //   })
    //   .catch((err) => {
    //     throw new ApiError(500, "Something went wrong");
    //   });
  }
});
const removeSize = asyncHandler(async (req, res) => {
  const removalid = req.params.id;
  const founddata = await Size.findById(removalid);
  let session = null;
  if (!founddata) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    return Size.createCollection()
      .then(async () => await Size.startSession())
      .then(async (_session) => {
        session = _session;
        session.startTransaction();
        await Size1.findByIdAndDelete(removalid).session(session);
        return Size.findByIdAndDelete(removalid).session(session);
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

    // await Size.findByIdAndDelete(removalid)
    //   .then((success) => {
    //     return res
    //       .status(201)
    //       .json(new ApiResponse(200, success, "Size Details deleted"));
    //   })
    //   .catch((err) => {
    //     throw new ApiError(500, "Something went wrong");
    //   });
  }
});
const getSize = asyncHandler(async (req, res) => {
  let session = null;
  return Size.createCollection()
    .then(async () => await Size.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      const sizedet = await Size.find().sort({ _id: -1 }).session(session);
      const sizedupdet = await Size1.find().sort({ _id: -1 }).session(session);
      if (sizedet.length || sizedupdet.length) {
        return sizedet;
      } else {
        throw new ApiError(500, "Something went wrong ");
      }
    })
    .then((doc) => assert.ok(doc))
    .then(() => session.commitTransaction())
    .then(() => session.endSession())
    .then(() => Size.find().sort({ _id: -1 }))
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

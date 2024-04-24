import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { Brand, Brand1 } from "./../models/brand/brand.model.js";
import { brandMappingDetails } from "./../helpers/brand/brand_mapping.js";
import assert from "assert";

const addBrands = asyncHandler(async (req, res) => {
  let session = null;
  const newDetails = new Brand({});
  const mappedDetails = brandMappingDetails(newDetails, req.body);
  return Brand.createCollection()
    .then(async () => await Brand.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      await Brand1.create([mappedDetails], { session: session });
      return Brand.create([mappedDetails], { session: session });
    })
    .then((sizedet) => Brand.findById(sizedet[0]._id).session(session))
    .then((doc) => assert.ok(doc))
    .then(() => session.commitTransaction())
    .then(() => Brand.findById(mappedDetails._id))
    .then((doc) => assert.ok(doc))
    .then(() => session.endSession())
    .then(() =>
      res
        .status(201)
        .json(new ApiResponse(200, {}, "Brand created successfully"))
    )
    .catch((err) => {
      session.abortTransaction();

      throw new ApiError(500, "Something went wrong while registering User.");
    });
});
const updateBrands = asyncHandler(async (req, res) => {
  const updateid = req.params.id;
  const founddetails = await Brand.findById(updateid);
  let session = null;
  if (!founddetails) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    const mappedDetails = brandMappingDetails(founddetails, req.body);
    return Brand.createCollection()
      .then(async () => await Brand.startSession())
      .then(async (_session) => {
        session = _session;
        session.startTransaction();
        await Brand1.findByIdAndUpdate(
          { _id: mappedDetails._id },
          mappedDetails
        ).session(session);
        return Brand.findByIdAndUpdate(
          { _id: mappedDetails._id },
          mappedDetails
        ).session(session);
      })
      .then((doc) => assert.ok(doc))
      .then(() => session.commitTransaction())
      .then(() => session.endSession())
      .then(() =>
        res.status(201).json(new ApiResponse(200, {}, "Brand Details Updated"))
      )
      .catch((err) => {
        session.abortTransaction();

        throw new ApiError(500, "Something went wrong while Updatind Brand.");
      });
  }
});
const removeBrands = asyncHandler(async (req, res) => {
  const removalid = req.params.id;
  const founddata = await Brand.findById(removalid);
  let session = null;
  if (!founddata) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    return Brand.createCollection()
      .then(async () => await Brand.startSession())
      .then(async (_session) => {
        session = _session;
        session.startTransaction();
        await Brand1.findByIdAndDelete(removalid).session(session);
        return Brand.findByIdAndDelete(removalid).session(session);
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
const getBrand = asyncHandler(async (req, res) => {
  let session = null;
  return Brand.createCollection()
    .then(async () => await Brand.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      const sizedet = await Brand.find().sort({ _id: -1 }).session(session);
      const sizedupdet = await Brand1.find().sort({ _id: -1 }).session(session);
      if (sizedet.length || sizedupdet.length) {
        return sizedet;
      } else {
        throw new ApiError(500, "Something went wrong ");
      }
    })
    .then((doc) => assert.ok(doc))
    .then(() => session.commitTransaction())
    .then(() => session.endSession())
    .then(() => Brand.find().sort({ _id: -1 }))
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
const getBrandbyid = asyncHandler(async (req, res) => {
  const getid = req.params.id;
  const branddata = await Brand.findById(getid);
  if (!branddata) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res.status(201).json(new ApiResponse(200, branddata, "Brand Details"));
});

export { addBrands, updateBrands, removeBrands, getBrand, getBrandbyid };

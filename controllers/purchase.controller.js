import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { Purchase, Purchase1 } from "./../models/purchase/purchase.model.js";
import { purchaseMappingDetails } from "./../helpers/purchase/purchase_mapping.js";
import { purchaseDetMapping } from "./../helpers/purchase/purchaseDetails_mapping.js";
import assert from "assert";

const addPurchase = asyncHandler(async (req, res) => {
  let session = null;
  const newDetails = new Purchase({});
  const mappedDetails = purchaseMappingDetails(newDetails, req.body);
  return Purchase.createCollection()
    .then(async () => await Purchase.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      await Purchase1.create([mappedDetails], { session: session });
      return Purchase.create([mappedDetails], { session: session });
    })
    .then((sizedet) => Purchase.findById(sizedet[0]._id).session(session))
    .then((doc) => assert.ok(doc))
    .then(() => session.commitTransaction())
    .then(() => Purchase.findById(mappedDetails._id))
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
  // const mypurchase = await Purchase.create(mappedDetails);
  // const createdDetails = await Purchase.findById(mypurchase._id);
  // if (!createdDetails) {
  //   throw new ApiError(500, "Something went wrong while registering User.");
  // }
  // return res
  //   .status(201)
  //   .json(
  //     new ApiResponse(200, createdDetails, "Purchase created successfully")
  //   );
});
const updatePurchase = asyncHandler(async (req, res) => {
  const updateid = req.params.id;
  const founddetails = await Purchase.findById(updateid);
  let session = null;
  if (!founddetails) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    const mappedDetails = purchaseMappingDetails(founddetails, req.body);
    return Purchase.createCollection()
      .then(async () => await Purchase.startSession())
      .then(async (_session) => {
        session = _session;
        session.startTransaction();
        await Purchase1.findByIdAndUpdate(
          { _id: mappedDetails._id },
          mappedDetails
        ).session(session);
        return Purchase.findByIdAndUpdate(
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
    // await Purchase.findByIdAndUpdate({ _id: mappedDetails._id }, mappedDetails)
    //   .then((success) => {
    //     return res
    //       .status(201)
    //       .json(
    //         new ApiResponse(200, mappedDetails, "Purchase Details updated")
    //       );
    //   })
    //   .catch((err) => {
    //     throw new ApiError(500, "Something went wrong");
    //   });
  }
});
const deletePurchase = asyncHandler(async (req, res) => {
  const removalid = req.params.id;
  const founddata = await Purchase.findById(removalid);
  let session = null;
  if (!founddata) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    return Purchase.createCollection()
      .then(async () => await Purchase.startSession())
      .then(async (_session) => {
        session = _session;
        session.startTransaction();
        await Purchase1.findByIdAndDelete(removalid).session(session);
        return Purchase.findByIdAndDelete(removalid).session(session);
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
    // await Purchase.findByIdAndDelete(removalid)
    //   .then((success) => {
    //     return res
    //       .status(201)
    //       .json(new ApiResponse(200, success, "Purchase Details deleted"));
    //   })
    //   .catch((err) => {
    //     throw new ApiError(500, "Something went wrong");
    //   });
  }
});
const getPurchase = asyncHandler(async (req, res) => {
  let session = null;
  // const purchasedata = await Purchase.find().sort({ _id: -1 });
  // if (!purchasedata) {
  //   throw new ApiError(500, "Something went wrong while registering User.");
  // }
  // return res
  //   .status(201)
  //   .json(new ApiResponse(200, purchasedata, "Purchase Details"));
  return Purchase.createCollection()
    .then(async () => await Purchase.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      const sizedet = await Purchase.find().sort({ _id: -1 }).session(session);
      const sizedupdet = await Purchase1.find()
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
    .then(() => Purchase.find().sort({ _id: -1 }))
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
const getPurchasebyid = asyncHandler(async (req, res) => {
  const getid = req.params.id;
  const purchasedata = await Purchase.findById(getid);
  if (!purchasedata) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, purchasedata, "Purchase Details"));
});
export {
  addPurchase,
  updatePurchase,
  deletePurchase,
  getPurchase,
  getPurchasebyid,
};

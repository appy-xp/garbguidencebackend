import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { Item, Item1 } from "./../models/item/item.model.js";
import { itemMappingDetails } from "./../helpers/item/item_mapping.js";

const addItem = asyncHandler(async (req, res) => {
  let session = null;
  const newDetails = new Item({});
  const mappedDetails = itemMappingDetails(newDetails, req.body);
  return Item.createCollection()
    .then(async () => await Size.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      await Item1.create([mappedDetails], { session: session });
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
      console.log("error is>>", err);
      throw new ApiError(500, "Something went wrong while Item.");
    });
  // const size = await Item.create(mappedDetails);
  // const createdDetails = await Item.findById(size._id).select(
  //   "-sizeId -brandId -bomId -statusId"
  // );
  // if (!createdDetails) {
  //   throw new ApiError(500, "Something went wrong while registering Item.");
  // }
  // return res
  //   .status(201)
  //   .json(new ApiResponse(200, createdDetails, "Item created successfully"));
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
        console.log("error is>>", err);
        throw new ApiError(500, "Something went wrong while deleting Item.");
      });
    // await Item.findByIdAndUpdate({ _id: mappedDetails._id }, mappedDetails)
    //   .then((success) => {
    //     return res
    //       .status(201)
    //       .json(new ApiResponse(200, mappedDetails, "Item Details updated"));
    //   })
    //   .catch((err) => {
    //     throw new ApiError(500, "Something went wrong");
    //   });
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
        console.log("error is>>", err);
        throw new ApiError(500, "Something went wrong while deleting Item.");
      });

    // await Item.findByIdAndDelete(removalid)
    //   .then((success) => {
    //     return res
    //       .status(201)
    //       .json(new ApiResponse(200, success, "Item Details deleted"));
    //   })
    //   .catch((err) => {
    //     throw new ApiError(500, "Something went wrong");
    //   });
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
      console.log("error is>>", err);
      throw new ApiError(500, "Something went wrong while registering User.");
    });
  // const itemdata = await Item.find().sort({ _id: -1 });
  // if (!itemdata) {
  //   throw new ApiError(500, "Something went wrong while registering Item.");
  // }
  // return res.status(201).json(new ApiResponse(200, itemdata, "Item Details"));
});
const getItembyid = asyncHandler(async (req, res) => {
  const getid = req.params.id;
  const itemdata = await Item.findById(getid);
  if (!itemdata) {
    throw new ApiError(500, "Something went wrong while registering User.");
  }
  return res.status(201).json(new ApiResponse(200, itemdata, "Item Details"));
});

export { addItem, updateItem, removeItem, getItem, getItembyid };

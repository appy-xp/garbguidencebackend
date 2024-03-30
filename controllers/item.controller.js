import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { Item } from "./../models/item/item.model.js";
import { itemMappingDetails } from "./../helpers/item/item_mapping.js";

const addItem = asyncHandler(async (req, res) => {
  const newDetails = new Item({});
  const mappedDetails = itemMappingDetails(newDetails, req.body);
  const size = await Item.create(mappedDetails);
  const createdDetails = await Item.findById(size._id).select(
    "-sizeId -brandId -bomId -statusId"
  );
  if (!createdDetails) {
    throw new ApiError(500, "Something went wrong while registering Item.");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdDetails, "Item created successfully"));
});
const updateItem = asyncHandler(async (req, res) => {
  const updateid = req.params.id;
  const founddetails = await Item.findById(updateid);
  if (!founddetails) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    const mappedDetails = itemMappingDetails(founddetails, req.body);
    await Item.findByIdAndUpdate({ _id: mappedDetails._id }, mappedDetails)
      .then((success) => {
        return res
          .status(201)
          .json(new ApiResponse(200, mappedDetails, "Item Details updated"));
      })
      .catch((err) => {
        throw new ApiError(500, "Something went wrong");
      });
  }
});
const removeItem = asyncHandler(async (req, res) => {
  const removalid = req.params.id;
  const founddata = await Item.findById(removalid);
  if (!founddata) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    await Item.findByIdAndDelete(removalid)
      .then((success) => {
        return res
          .status(201)
          .json(new ApiResponse(200, success, "Item Details deleted"));
      })
      .catch((err) => {
        throw new ApiError(500, "Something went wrong");
      });
  }
});
const getItem = asyncHandler(async (req, res) => {
  const itemdata = await Item.find().sort({ _id: -1 });
  if (!itemdata) {
    throw new ApiError(500, "Something went wrong while registering Item.");
  }
  return res.status(201).json(new ApiResponse(200, itemdata, "Item Details"));
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

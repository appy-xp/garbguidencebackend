import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { BOM, BOM1 } from "./../models/bom/bom.model.js";
import { bomMappingDetails } from "./../helpers/bom/bom_mapping.js";
import { bomMappingDeta } from "./../helpers/bom/bomdetails_mapping.js";
import assert from "assert";
import qr from "qr-image";
import fs from "fs";
import { removeFile } from "./../utils/file_unlink.js";
import { qrImgPath } from "./../utils/file_locationenvironment.js";

const addBom = asyncHandler(async (req, res) => {
  let session = null;
  const newDetails = new BOM({});
  const mappedDetails = bomMappingDetails(newDetails, req.body);
  const qrfilename = await generateQR(mappedDetails._id.toString());
  mappedDetails.image = qrfilename;
  return BOM.createCollection()
    .then(async () => await BOM.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();

      await BOM1.create([mappedDetails], { session: session });
      return BOM.create([mappedDetails], { session: session });
    })
    .then((sizedet) => BOM.findById(sizedet[0]._id).session(session))
    .then((doc) => assert.ok(doc))
    .then(() => session.commitTransaction())
    .then(() => BOM.findById(mappedDetails._id))
    .then((doc) => assert.ok(doc))
    .then(() => session.endSession())
    .then(() =>
      res
        .status(201)
        .json(new ApiResponse(200, {}, "Size created successfully"))
    )
    .catch((err) => {
      session.abortTransaction();
      removeFile(qrImgPath + "/" + qrfilename);
      console.log("error is>>", err);
      throw new ApiError(500, "Something went wrong while registering User.");
    });
  // const myBOM = await BOM.create(mappedDetails);
  // const createdDetails = await BOM.findById(myBOM._id);
  // if (!createdDetails) {
  //   throw new ApiError(500, "Something went wrong while registering BOM.");
  // }

  // return res
  //   .status(201)
  //   .json(new ApiResponse(200, createdDetails, "BOM created successfully"));
});
const updateBom = asyncHandler(async (req, res) => {
  const updateid = req.params.id;
  const founddetails = await BOM.findById(updateid);
  let session = null;
  if (!founddetails) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    const mappedDetails = bomMappingDetails(founddetails, req.body);
    return BOM.createCollection()
      .then(async () => await BOM.startSession())
      .then(async (_session) => {
        session = _session;
        session.startTransaction();
        await BOM1.findByIdAndUpdate(
          { _id: mappedDetails._id },
          mappedDetails
        ).session(session);
        return BOM.findByIdAndUpdate(
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
    // await BOM.findByIdAndUpdate({ _id: mappedDetails._id }, mappedDetails)
    //   .then((success) => {
    //     return res
    //       .status(201)
    //       .json(new ApiResponse(200, mappedDetails, "BOM Details updated"));
    //   })
    //   .catch((err) => {
    //     throw new ApiError(500, "Something went wrong");
    //   });
  }
});
const deleteBom = asyncHandler(async (req, res) => {
  const removalid = req.params.id;
  const founddata = await BOM.findById(removalid);
  console.log("found data>>", founddata);
  let session = null;
  if (!founddata) {
    throw new ApiError(500, "Details doesnot exist.");
  } else {
    return BOM.createCollection()
      .then(async () => await BOM.startSession())
      .then(async (_session) => {
        session = _session;
        session.startTransaction();
        await BOM1.findByIdAndDelete(removalid).session(session);
        return BOM.findByIdAndDelete(removalid).session(session);
      })
      .then((doc) => assert.ok(doc))
      .then(() => session.commitTransaction())
      .then(() => session.endSession())
      .then(() => {
        removeFile(qrImgPath + "/" + founddata.image);
        return res
          .status(201)
          .json(new ApiResponse(200, {}, "Size Details deleted"));
      })
      .catch((err) => {
        session.abortTransaction();
        console.log("error is>>", err);
        throw new ApiError(500, "Something went wrong while deleting Size.");
      });
    // await BOM.findByIdAndDelete(removalid)
    //   .then((success) => {
    //     return res
    //       .status(201)
    //       .json(new ApiResponse(200, success, "BOM Details deleted"));
    //   })
    //   .catch((err) => {
    //     throw new ApiError(500, "Something went wrong");
    //   });
  }
});
const getBom = asyncHandler(async (req, res) => {
  let session = null;
  return BOM.createCollection()
    .then(async () => await BOM.startSession())
    .then(async (_session) => {
      session = _session;
      session.startTransaction();
      const sizedet = await BOM.find().sort({ _id: -1 }).session(session);
      const sizedupdet = await BOM1.find().sort({ _id: -1 }).session(session);
      if (sizedet.length || sizedupdet.length) {
        return sizedet;
      } else {
        throw new ApiError(500, "Something went wrong ");
      }
    })
    .then((doc) => assert.ok(doc))
    .then(() => session.commitTransaction())
    .then(() => session.endSession())
    .then(() => BOM.find().sort({ _id: -1 }))
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
  // const bomData = await BOM.find().sort({ _id: -1 });
  // if (!bomData) {
  //   throw new ApiError(500, "Something went wrong while registering BOM.");
  // }
  // return res.status(201).json(new ApiResponse(200, bomData, "BOM Details"));
});
const getBombyid = asyncHandler(async (req, res) => {
  const getid = req.params.id;
  const bomData = await BOM.findById(getid);
  if (!bomData) {
    throw new ApiError(500, "Something went wrong while registering BOM.");
  }
  return res.status(201).json(new ApiResponse(200, bomData, "BOM Details"));
});
const generateQR = async (id) => {
  const getid = id;
  try {
    var qr_png = qr.image(getid, { type: "png" });
    var filename = new Date().getTime() + getid + ".png";
    qr_png.pipe(fs.createWriteStream(qrImgPath + "/" + filename));
    return filename;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong while registering BOM.");
  }

  // qr.image(getid)
  //   .then((url) => {
  //     return res.status(201).json(new ApiResponse(200, url, "BOM Details"));
  //   })
  //   .catch((err) => {
  //     throw new ApiError(500, "Something went wrong while registering BOM.");
  //   });
};
export { addBom, updateBom, deleteBom, getBom, getBombyid };

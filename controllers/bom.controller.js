import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { BOM } from "./../models/bom/bom.model.js";
import { bomMappingDetails } from "./../helpers/bom/bom_mapping.js";
import { bomMappingDeta } from "./../helpers/bom/bomdetails_mapping.js";

const addBom = asyncHandler(async (req, res) => {});
const updateBom = asyncHandler(async (req, res) => {});
const deleteBom = asyncHandler(async (req, res) => {});
const getBom = asyncHandler(async (req, res) => {});
const getBombyid = asyncHandler(async (req, res) => {});
export { addBom, updateBom, deleteBom, getBom, getBombyid };

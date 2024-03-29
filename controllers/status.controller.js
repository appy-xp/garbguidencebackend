import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { Status } from "./../models/status/status.model.js";
import { statusMappingDetails } from "./../helpers/status/status_mapping.js";

const addStatus = asyncHandler(async (req, res) => {});
const updateStatus = asyncHandler(async (req, res) => {});
const deleteStatus = asyncHandler(async (req, res) => {});
const getStatus = asyncHandler(async (req, res) => {});
const getStatusbyid = asyncHandler(async (req, res) => {});
export { addStatus, updateStatus, deleteStatus, getStatus, getStatusbyid };

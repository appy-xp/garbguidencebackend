import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { Role } from "./../models/roles/roles.model.js";
import { roleMappingDetails } from "./../helpers/roles/role_mapping.js";

const addRole = asyncHandler(async (req, res) => {});
const updateRole = asyncHandler(async (req, res) => {});
const deleteRole = asyncHandler(async (req, res) => {});
const getRole = asyncHandler(async (req, res) => {});
const getRolebyid = asyncHandler(async (req, res) => {});
export { addRole, updateRole, deleteRole, getRole, getRolebyid };

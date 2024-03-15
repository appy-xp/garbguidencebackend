export function userRoleMappingDetails(userRoleDet, userRoleDetails) {
  if (userRoleDetails.userId) {
    userRoleDet.userId = userRoleDetails.userId;
  }
  if (userRoleDetails.roleId) {
    userRoleDet.roleId = userRoleDetails.roleId;
  }

  return userRoleDet;
}

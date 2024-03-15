function roleMappingDetails(roles, rolesDetails) {
  if (rolesDetails.roles) {
    roles.roles = rolesDetails.roles;
  }
  if (rolesDetails.role_id) {
    roles.role_id = rolesDetails.role_id;
  }
  return roles;
}

export { roleMappingDetails };

module.exports = function userMappingDetails(userdet, userDetails) {
  if (userDetails.email) {
    userdet.email = userDetails.email;
  }
  if (userDetails.password) {
    userdet.password = userDetails.password;
  }
  if (userDetails.username) {
    userdet.username = userDetails.username;
  }
  return userdet;
};

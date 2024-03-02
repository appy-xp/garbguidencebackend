module.exports = function staffMappingDetails(staffDet, staffDetails) {
  if (staffDetails.firstName) {
    staffDet.firstName = staffDetails.firstName;
  }
  if (staffDetails.lastName) {
    staffDet.lastName = staffDetails.lastName;
  }
  if (staffDetails.contactNo) {
    staffDet.contactNo = staffDetails.contactNo;
  }
  if (staffDetails.statusId) {
    staffDet.statusId = staffDetails.statusId;
  }

  return staffDet;
};

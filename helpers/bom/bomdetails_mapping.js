module.exports = function bomMappingDetails(bomDet, bomDetails) {
  if (bomDetails.quantity) {
    bomDet.quantity = bomDetails.quantity;
  }
  if (bomDetails.bomId) {
    bomDet.bomId = bomDetails.bomId;
  }

  return bomDet;
};

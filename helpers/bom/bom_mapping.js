module.exports = function bomMappingDetails(bomDet, bomDetails) {
  if (bomDetails.modelName) {
    bomDet.modelName = bomDetails.modelName;
  }
  if (bomDetails.itemId) {
    bomDet.itemId = bomDetails.itemId;
  }

  return bomDet;
};

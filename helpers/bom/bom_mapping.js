export function bomMappingDetails(bomDet, bomDetails) {
  if (bomDetails.modelName) {
    bomDet.modelName = bomDetails.modelName;
  }
  if (bomDetails.bomdetails) {
    bomDet.bomdetails = bomDetails.bomdetails;
  }
  if (bomDetails.image) {
    bomDet.image = bomDetails.image;
  }

  return bomDet;
}

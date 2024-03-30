export function bomMappingDetails(bomDet, bomDetails) {
  if (bomDetails.modelName) {
    bomDet.modelName = bomDetails.modelName;
  }
  if (bomDetails.bomdetails) {
    bomDet.bomdetails = bomDetails.bomdetails;
  }

  return bomDet;
}

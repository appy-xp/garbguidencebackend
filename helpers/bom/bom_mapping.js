export function bomMappingDetails(bomDet, bomDetails) {
  if (bomDetails.modelName) {
    bomDet.modelName = bomDetails.modelName;
  }

  return bomDet;
}

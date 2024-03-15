export function bomMappingDetails(bomDet, bomDetails) {
  if (bomDetails.quantity) {
    bomDet.quantity = bomDetails.quantity;
  }
  if (bomDetails.purchaseId) {
    bomDet.purchaseId = bomDetails.purchaseId;
  }

  return bomDet;
}

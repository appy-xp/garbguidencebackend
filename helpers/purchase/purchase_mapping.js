export function purchaseMappingDetails(purchaseDet, purchaseDetails) {
  if (purchaseDetails.itemname) {
    purchaseDet.itemname = purchaseDetails.itemname;
  }
  if (purchaseDetails.purchaseDetails) {
    purchaseDet.purchaseDetails = purchaseDetails.purchaseDetails;
  }

  return purchaseDet;
}

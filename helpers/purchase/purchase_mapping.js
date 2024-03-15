export function purchaseMappingDetails(purchaseDet, purchaseDetails) {
  if (purchaseDetails.itemname) {
    purchaseDet.itemname = purchaseDetails.itemname;
  }

  return purchaseDet;
}

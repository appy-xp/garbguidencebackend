export function purchaseDetMapping(purchaseDet, purchaseDetails) {
  if (purchaseDetails.quantity) {
    purchaseDet.quantity = purchaseDetails.quantity;
  }
  if (purchaseDetails.unit) {
    purchaseDet.unit = purchaseDetails.unit;
  }

  return purchaseDet;
}

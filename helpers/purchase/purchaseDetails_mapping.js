module.exports = function purchaseDetMapping(purchaseDet, purchaseDetails) {
  if (purchaseDetails.quantity) {
    purchaseDet.quantity = purchaseDetails.quantity;
  }
  if (purchaseDetails.unit) {
    purchaseDet.unit = purchaseDetails.unit;
  }
  if (purchaseDetails.purchaseId) {
    purchaseDet.purchaseId = purchaseDetails.purchaseId;
  }

  return purchaseDet;
};

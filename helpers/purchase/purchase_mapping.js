module.exports = function purchaseMappingDetails(purchaseDet, purchaseDetails) {
  if (purchaseDetails.itemname) {
    purchaseDet.itemname = purchaseDetails.itemname;
  }
  if (purchaseDetails.bomdetailId) {
    purchaseDet.bomdetailId = purchaseDetails.bomdetailId;
  }

  return purchaseDet;
};

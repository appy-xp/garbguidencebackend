module.exports = function itemMappingDetails(itemDet, itemDetails) {
  if (itemDetails.modelName) {
    itemDet.modelName = itemDetails.modelName;
  }
  if (itemDetails.itemName) {
    itemDet.itemName = itemDetails.itemName;
  }
  if (itemDetails.quantity) {
    itemDet.quantity = itemDetails.quantity;
  }

  return itemDet;
};

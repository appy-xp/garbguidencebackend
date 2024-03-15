function itemMappingDetails(itemDet, itemDetails) {
  if (itemDetails.modelName) {
    itemDet.modelName = itemDetails.modelName;
  }
  if (itemDetails.itemName) {
    itemDet.itemName = itemDetails.itemName;
  }
  if (itemDetails.quantity) {
    itemDet.quantity = itemDetails.quantity;
  }
  if (itemDetails.sizeId) {
    itemDet.sizeId = itemDetails.sizeId;
  }
  if (itemDetails.brandId) {
    itemDet.brandId = itemDetails.brandId;
  }
  if (itemDetails.bomId) {
    itemDet.bomId = itemDetails.bomId;
  }
  if (itemDetails.statusId) {
    itemDet.statusId = itemDetails.statusId;
  }

  return itemDet;
}

export { itemMappingDetails };

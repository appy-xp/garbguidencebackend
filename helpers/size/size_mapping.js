function sizeMappingDetails(sizeDet, sizeDetails) {
  if (sizeDetails.sizeName) {
    sizeDet.sizeName = sizeDetails.sizeName;
  }
  if (sizeDetails.sizeCode) {
    sizeDet.sizeCode = sizeDetails.sizeCode;
  }
  if (sizeDetails.sizeDetail) {
    sizeDet.sizeDetail = sizeDetails.sizeDetail;
  }

  return sizeDet;
}

export { sizeMappingDetails };

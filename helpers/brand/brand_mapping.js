module.exports = function brandMappingDetails(brandDet, brandDetails) {
  if (brandDetails.brandName) {
    brandDet.brandName = brandDetails.brandName;
  }

  return brandDet;
};

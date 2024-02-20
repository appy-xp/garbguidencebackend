module.exports = function brandMappingDetails(brandDet, brandDetails) {
  if (brandDetails.itemname) {
    brandDet.itemname = brandDetails.itemname;
  }

  return brandDet;
};

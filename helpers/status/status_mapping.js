function statusMappingDetails(statusDet, statusDetails) {
  if (statusDetails.isAssigned) {
    statusDet.isAssigned = statusDetails.isAssigned;
  }
  if (statusDetails.isReceived) {
    statusDet.isReceived = statusDetails.isReceived;
  }
  if (statusDetails.isSteching) {
    statusDet.isSteching = statusDetails.isSteching;
  }
  if (statusDetails.isFinishing) {
    statusDet.isFinishing = statusDetails.isFinishing;
  }
  if (statusDetails.isPacking) {
    statusDet.isPacking = statusDetails.isPacking;
  }
  if (statusDetails.isDispatched) {
    statusDet.isDispatched = statusDetails.isDispatched;
  }
  if (statusDetails.itemId) {
    statusDet.itemId = statusDetails.itemId;
  }
  if (statusDetails.staffId) {
    statusDet.staffId = statusDetails.staffId;
  }

  return statusDet;
}

export { statusMappingDetails };

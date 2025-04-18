function hasRequest(
  currentUserID,
  requests
) {
  const foundRequests = requests?.filter((request) => {
    return request?.requeststo[0]?.id === currentUserID;
  });
  if (foundRequests?.length > 0) {
    let id = foundRequests[0]?.id;
    foundRequests.splice(0, foundRequests.length);
    return { isRequested: true, id };
  } else {
    return { isRequested: false, id: -1 };
  }
}
export default hasRequest;

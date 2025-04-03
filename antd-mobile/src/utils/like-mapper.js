function hasLikedPost(
  currentUserID,
  likes
){
  const foundLikes = likes?.filter((like) => {
    return like?.usersto[0]?.id === currentUserID;
  });

  if (foundLikes.length > 0) {
    const id = foundLikes[0]?.id;
    foundLikes.splice(0, foundLikes.length);
    return { likedTo: true, id };
  } else {
    return { likedTo: false, id: -1 };
  }
}
export default hasLikedPost;

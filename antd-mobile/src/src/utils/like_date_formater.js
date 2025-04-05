function formatLikeDate(dateStr) {
  const likeDate = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  if (likeDate.toDateString() === today.toDateString()) {
    return "Today";
  } else if (likeDate.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return formatDate(likeDate);
  }
}

export default formatLikeDate;

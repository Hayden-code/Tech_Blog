const addComment = async (postId) => {
  const commentInputId = "commentInput" + postId;
  const commentText = document.getElementById(commentInputId).value.trim();
  if (commentText) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        postId,
        commentText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

// Creating a post
const createPost = async () => {
  const postTitle = document.getElementById("postTitle").value.trim();
  const postDescription = document
    .getElementById("postDescription")
    .value.trim();
  if (postTitle) {
    const response = await fetch("/api/posts/newPost", {
      method: "POST",
      body: JSON.stringify({ postTitle, postDescription }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      alert(response.statusText);
    }
  }
};

// Adding comments
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

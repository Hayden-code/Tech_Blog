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

// Update post
const updatePost = async (postId) => {
  const updatePostId = "updatePost" + postId;
  const postTitleId = "postTitle" + postId;
  const postDescriptionId = "postDescription" + postId;

  const postTitle = document.getElementById(postTitleId).value.trim();
  const postDescription = document
    .getElementById(postDescriptionId)
    .value.trim();

  if (postTitle) {
    const response = await fetch("/api/posts/editPost", {
      method: "PUT",
      body: JSON.stringify({ postTitle, postDescription, updatePostId }),
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

// Deleting comments
const deleteComment = async (commentId) => {
  const response = await fetch("/api/comments/delete", {
    method: "DELETE",
    body: JSON.stringify({
      commentId,
    }),
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
};

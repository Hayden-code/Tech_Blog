const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const auth = require("../../utils/authentication");

router.get("/", async (req, res) => {
  try {
    const allComments = await Comment.findAll();
    return res.status(200).json(allComments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create({
      content: req.body.commentText,
      postId: req.body.postId,
      userId: req.session.userId,
    });

    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/delete", (req, res) => {
  try {
    const deleteUserComment = Post.destroy({
      where: {
        id: req.body.commentId,
      },
    });
    res.status(500).json(deleteUserComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

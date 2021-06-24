const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const auth = require("../../utils/authentication");

router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      attributes: ["id", "content", "title"],
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          attributes: ["id", "content", "postId", "userId"],
          include: { model: User, attributes: ["username"] },
        },
      ],
    });
    return res.status(200).json(allPosts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/newPost", async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.postTitle,
      content: req.body.postDescription,
      userId: req.session.userId,
    });
    return res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put("/editPost", async (req, res) => {
  try {
    const updatePost = await Post.update(req.body, {
      where: {
        id: req.body.updatePostId,
      },
      // title: req.body.postTitle,
      // content: req.body.postDescription,
      // userId: req.session.userId,
    });
    return res.status(200).json(updatePost);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put("/editPost", (req, res) => {
  const postId = req.body.updatePostId;
  postId.content = req.body.postDescription;
  postId.title = req.body.postTitle;
  return res.status(200).json(postId);
});

module.exports = router;

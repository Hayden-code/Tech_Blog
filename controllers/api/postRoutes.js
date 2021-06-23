const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

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

module.exports = router;

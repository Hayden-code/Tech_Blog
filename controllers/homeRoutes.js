const router = require("express").Router();
const { User, Post, Comment } = require("../models");

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
    const postList = allPosts.map((post) => post.get({ plain: true }));

    res.render("postList", {
      postList,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  } else {
    res.render("login", {
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  }
});

router.get("/settings", (req, res) => {
  res.render("settings", {
    loggedIn: req.session.loggedIn,
    username: req.session.username,
  });
});

module.exports = router;

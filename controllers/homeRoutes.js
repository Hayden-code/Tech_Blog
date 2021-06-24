const router = require("express").Router();
const { User, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      attributes: ["id", "content", "title", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          attributes: ["id", "content", "postId", "userId", "created_at"],
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

router.get("/createPost", (req, res) => {
  res.render("createPost", {
    loggedIn: req.session.loggedIn,
    username: req.session.username,
  });
});

router.get("/userPosts", async (req, res) => {
  try {
    const allUserPosts = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
      attributes: ["id", "content", "title", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          attributes: ["id", "content", "postId", "userId", "created_at"],
          include: { model: User, attributes: ["username"] },
        },
      ],
    });
    const postList = allUserPosts.map((post) => post.get({ plain: true }));

    res.render("userPosts", {
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

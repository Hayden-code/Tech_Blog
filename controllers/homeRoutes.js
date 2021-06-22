const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("postList", {
    loggedIn: req.session.loggedIn,
    username: req.session.username,
  });
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

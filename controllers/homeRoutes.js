const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("layouts/main");
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  } else {
    res.render("login");
  }
});

module.exports = router;

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("layouts/main");
});

module.exports = router;

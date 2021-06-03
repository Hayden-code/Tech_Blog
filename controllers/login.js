const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("LOGIN ROUTE");
});

module.export = router;

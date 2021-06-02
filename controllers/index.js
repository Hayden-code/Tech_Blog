const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const login = require("./login");

router.use("/", homeRoutes);

router.use("/login", login);

router.use("/api", apiRoutes);

router.get("/", (req, res) => {
  res.send("FIRST ROUTE");
});

module.exports = router;

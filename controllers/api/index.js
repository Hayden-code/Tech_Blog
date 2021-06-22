const router = require("express").Router();
const userRoutes = require("./userRoutes");
const posts = require("./postRoutes");
// const comments = require("./commentRoutes");

router.use("/user", userRoutes);
router.use("/posts", posts);
// router.use("/comments", comments);

module.exports = router;

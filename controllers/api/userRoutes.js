const router = require("express").Router();
const session = require("express-session");
const User = require("../../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create User
router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.loggedIn = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Please enter a valid username or signup." });
    }

    const password = await user.checkPassword(req.body.password);
    if (!password) {
      return res
        .status(400)
        .json({ message: "Incorrect Password. Please try again." });
    }
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = user.username;
      return res.status(200).json({ user, message: "You are now logged in!" });
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;

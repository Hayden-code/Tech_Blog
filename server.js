const path = require("path");
const express = require("express");
const session = require("express-session");
const exhbs = require("express-handlebars");
const routes = require("/controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const sequelizeStore = require("connect-session-sequelize");

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exhbs.create({ helpers });

const sess = {
  secret: "Shh secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

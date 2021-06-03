// Dependencies
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
// uncomment if helpers is used
// const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const sequelizeStore = require("connect-session-sequelize")(session.Store);

// Initialise and set port for server
const app = express();
const PORT = process.env.PORT || 3001;

// uncomment if helpers is used
// const hbs = exhbs.create({ helpers });

// Initialise session
const sessionInit = {
  secret: "Shh secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sessionInit));

// Set handlebars as the engine for the server.
// swap line 35 with 34 if helpers is used.
// app.engine("handlebars", hbs.engine);
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Initialise the parsing of json and string data through express.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}/`)
  );
});

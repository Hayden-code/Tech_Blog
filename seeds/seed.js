const User = require("../models/user");

const userSeed = require("./userSeeds");

const sequelize = require("../config/connection");

const addSeedsToDatabase = async () => {
  console.log("\n ------------SYNCING DATABASE ------------ \n");
  await sequelize.sync({ force: true });
  console.log("\n ----------- ADDING USER TABLE ------------\n");
  await User.bulkCreate(userSeed);
  process.exit;
};

addSeedsToDatabase();

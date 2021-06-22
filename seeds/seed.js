const { User, Post, Comment } = require("../models");

const userSeed = require("./userSeeds");
const postSeed = require("./postSeeds");
const commentSeed = require("./commentSeeds");

const sequelize = require("../config/connection");

const addSeedsToDatabase = async () => {
  console.log("\n ------------SYNCING DATABASE ------------ \n");
  await sequelize.sync({ force: true });
  console.log("\n ----------- ADDING USER TABLE ------------\n");
  await User.bulkCreate(userSeed);
  console.log("\n ----------- ADDING POST TABLE ------------\n");
  await Post.bulkCreate(postSeed);
  console.log("\n ----------- ADDING COMMENT TABLE ------------\n");
  await Comment.bulkCreate(commentSeed);

  process.exit;
};

addSeedsToDatabase();

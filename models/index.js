const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

User.hasMany(Post, {
  foreignKey: "userId",
});
User.hasMany(Comment, {
  foreignKey: "userId",
  onDelete: "cascade",
  hooks: true,
});

Post.belongsTo(User, {
  foreignKey: "userId",
});
Post.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "cascade",
  hooks: true,
});

Comment.belongsTo(Post, {
  foreignKey: "postId",
  onDelete: "cascade",
  hooks: true,
});
Comment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "cascade",
  hooks: true,
});

module.exports = { User, Post, Comment };

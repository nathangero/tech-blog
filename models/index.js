const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Establish relationships

// User has many Posts and Comments
User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
})

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
})

// Post has many Comments
Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: 'CASCADE'
})


module.exports = { User, Post, Comment }
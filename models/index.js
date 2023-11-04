// All models are 1 to many. NO many to many
/*
User have many posts
Post have many comments
Comments belong to many Users and Posts

*/

const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Establish relationships
User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
})

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
})

Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: 'CASCADE'
})


module.exports = { User, Post, Comment }
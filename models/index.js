const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Establish relationships

// User has many Posts and Comments
User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
});

// Allow Post to include Comment
Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: 'CASCADE'
});

// Allow Post to include User
Post.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
})

// Allow Comment to include User model in sequelize
Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
});



// Comment.belongsTo(Post, {
//     foreignKey: "post_id",
//     onDelete: 'CASCADE'
// });


module.exports = { User, Post, Comment }
const { Comment } = require("../models");

const commentData = [
    {
        content: "Which CPU are you talking about?",
        user_id: 2,
        post_id: 1
    },
    {
        content: "I'm too poor to have a Mac though so that's why I want one.",
        user_id: 2,
        post_id: 2
    },
    {
        content: "Nah bro, Windows is where it's at!",
        user_id: 1,
        post_id: 2
    },
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;

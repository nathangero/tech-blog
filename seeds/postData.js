const { Post } = require("../models");

const postData = [
    {
        title: "New CPU",
        content: "It's really fast!",
        user_id: 1
    },
    {
        title: "Pc struggles",
        content: "I wish I was on a Mac :/",
        user_id: 2
    },
    {
        title: "New GPU",
        content: "So many frames!",
        user_id: 1
    },
    
]

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
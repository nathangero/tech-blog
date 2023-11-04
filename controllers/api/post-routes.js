/*
    create new post
    get all posts
    get 1 post my user id
    update post
    delete post
*/
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");


module.exports = router;
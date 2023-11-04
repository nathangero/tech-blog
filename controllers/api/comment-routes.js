/*
    create new comment
    see all comments for a post
    see 1 comment my user id
    update comment
    delete comment
*/
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");


module.exports = router;
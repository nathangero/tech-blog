/*
    all get requests to RENDER specific html pages
*/
const router = require("express").Router();
const { User, Post, Comment } = require("../models");

// TODO:

// router.get("/", async (req, res) => {
//     res.render("dashboard");
// })


module.exports = router;
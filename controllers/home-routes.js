/*
    all get requests to RENDER specific html pages
*/
const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");


// Show the homepage
router.get("/", async (req, res) => {
    try {
        const data = await Post.findAll({
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "content",
                        "createdAt",
                        [sequelize.literal(
                            `(SELECT user.username FROM user WHERE comments.user_id = user.id)`
                        ), "comment_author"],
                    ]
                },
            ],
            attributes: [
                "id",
                "title",
                "content",
                "createdAt",
                "updatedAt",
                [sequelize.literal(
                    `(SELECT user.username FROM user WHERE post.user_id = user.id)`
                ), "post_author"],
            ]
        });

        const posts = data.map((element) => element.get({ plain: true }));
        // console.log("posts:", posts);

        console.log("req.session.loggedIn:", req.session.loggedIn);
        console.log("req.session.userId:", req.session.userId);

        res.render("homepage", {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


// Show a specific post from a user from the Homepage
router.get("/post/:id", async (req, res) => {
    try {
        const data = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "content",
                        "createdAt",
                        [sequelize.literal(
                            `(SELECT user.username FROM user WHERE comments.user_id = user.id)`
                        ), "comment_author"],
                    ]
                },
            ],
            attributes: [
                "id",
                "title",
                "content",
                "createdAt",
                "updatedAt",
                [sequelize.literal(
                    `(SELECT user.username FROM user WHERE post.user_id = user.id)`
                ), "post_author"],
            ]
        });


        if (data) {
            const post = data.get({ plain: true });
            // console.log("users:", users)
            res.render("post", {
                post,
            });
        } else {
            res.status(404).json({ message: `Post ${req.params.id} doesn't exist`});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Go to the user's dashboard if the user is logged in, and show all their posts
router.get("/dashboard", withAuth, async (req, res) => {
    const userId = req.session.userId;
    
    try {
        const data = await Post.findAll({
            where: {
                user_id: userId
            },
            attributes: [
                "id",
                "title",
                "content",
                "createdAt",
                "updatedAt",
                "user_id" // Only include this when getting the dashboard posts
            ]
        });

        const posts = data.map((element) => element.get({ plain: true }));
        // console.log("posts:", posts);

        res.render("dashboard", {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

// Show a specific post from a user from the Dashboard
router.get("/dashboard/post/:id", withAuth, async (req, res) => {
    try {
        const data = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "content",
                        "createdAt",
                        [sequelize.literal(
                            `(SELECT user.username FROM user WHERE comments.user_id = user.id)`
                        ), "comment_author"],
                    ]
                },
            ],
            attributes: [
                "id",
                "title",
                "content",
                "createdAt",
                "updatedAt",
            ]
        });

        const loggedIn = req.session.loggedIn;

        if (data) {
            const post = data.get({ plain: true });
            // console.log("users:", users)
            res.render("post", {
                post,
                loggedIn
            });
        } else {
            res.status(404).json({ message: `Post ${postId} doesn't exist`});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


// Show login
router.get("/login", (req, res) => {
    res.render("login");
});

// Show signup
router.get("/signup", (req, res) => {
    res.render("signup");
});

module.exports = router;
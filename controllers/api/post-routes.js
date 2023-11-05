const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User, Post, Comment } = require("../../models");

// Get all posts, its comments, and the username that posted it
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
        

        if (data.length > 0) {
            const posts = data.map((element) => element.get({ plain: true }));
            // console.log("users:", users)
            res.status(200).json(posts);
        } else {
            res.status(404).json({ message: "There are no posts in the database"});
        }

    } catch (error) {
        res.status(500).json(error);
    }
});

// Get one post given an id
router.get("/:id", async (req, res) => {
    const postId = req.params.id;
    
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
            const posts = data.get({ plain: true });
            // console.log("users:", users)
            res.status(200).json(posts);
        } else {
            res.status(404).json({ message: `Post ${postId} doesn't exist`});
        }

    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/dashboard/:userId", async (req, res) => {
    try {
        const data = await Post.findAll({
            where: {
                user_id: req.params.userId
            },
            attributes: [
                "id",
                "title",
                "content",
                "createdAt",
                "updatedAt"
            ]
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Create a new post
router.post("/", async (req, res) => {
    const newPost = req.body;

    if (req.session.userId) { // Check if userId is in the session. Should exist from user login
        const userId = req.session.userId;
        newPost["user_id"] = userId;
    }

    try {
        const data = await Post.create(newPost);
        
        // TODO: change to res.redirect?
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Add a comment to a post
router.post("/addComment", async (req, res) => {
    const newComment = req.body;

    if (req.session.userId) { // Check if userId is in the session. Should exist from user login
        const userId = req.session.userId;
        newComment["user_id"] = userId;
    }

    try {
        const data = await Comment.create(newComment);
        
        // TODO: change to res.redirect?
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update a post's title and content
router.put("/:id", async (req, res) => {
    const postId = req.params.id;

    try {
        const data = await Post.update(req.body, {
            where: {
                id: postId
            }
        });

        if (data[0]) {
            // TODO: change to res.redirect?
            res.status(200).json({ message: "Successfully updated post" });
        } else {
            res.status(404).json({ "message": `No post with id ${postId}` });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


// Delete a post
router.delete("/:id", async (req, res) => {
    const postId = req.params.id;

    try {
        const data = await Post.destroy({
            where: {
                id: postId
            }
        });

        if (data) {
            // TODO: change to res.redirect("homepage");
            res.status(200).json({ message: "Successfully deleted post" });
        } else {
            res.status(404).json({ "message": `No post with id ${postId}` });
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;
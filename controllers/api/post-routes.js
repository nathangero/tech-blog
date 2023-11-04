/*
    create new post
    get all posts
    get 1 post my user id
    update post
    delete post
*/
const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User, Post, Comment } = require("../../models");

// Get all posts, its comments, and the username that posted it
router.get("/", async (req, res) => {
    try {
        const data = await Post.findAll({
            include: [{ model: Comment }],
            attributes: {
                include: [
                    [
                        sequelize.literal(
                            `(SELECT user.username FROM user WHERE post.user_id = user.id)`
                        ),
                        "posters_name",
                    ]
                ]
            }
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
        const data = await Post.findByPk(postId, {
            include: [{ model: Comment }],
            attributes: {
                include: [
                    [
                        sequelize.literal(
                            `(SELECT user.username FROM user WHERE post.user_id = user.id)`
                        ),
                        "posters_name",
                    ]
                ]
            }
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

// Create a new post
router.post("/", async (req, res) => {
    try {
        const data = await Post.create(req.body);
        
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
            res.status(200).json({ message: "Successfully updated post" });
        } else {
            res.status(404).json({ "message": `No post with id ${postId}` });
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

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
            res.status(200).json({ message: "Successfully deleted post" });
        } else {
            res.status(404).json({ "message": `No post with id ${postId}` });
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;
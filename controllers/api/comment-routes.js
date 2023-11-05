/*
    create new comment
    see all comments for a post
    see 1 comment my user id
    update comment
    delete comment
*/
const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", async (req, res) => {
    try {
        const data = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
            attributes: [
                "id",
                "content",
                "createdAt",
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

module.exports = router;
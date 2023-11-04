const router = require("express").Router();
const { User, Post, Comment } = require("../../models");


router.get("/", async (req, res) => {
    try {
        const data = await User.findAll({
            // includes: [{ model: Post }, { model: Comment }]
        })

        if (data.length > 0) {
            const users = data.map((element) => element.get({ plain: true }));
            // console.log("users:", users)
            res.status(200).json(users);
        } else {
            res.status(404).json({ message: "There are no users in the database"});
        }

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;
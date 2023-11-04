const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// Get all users. Probably not used but implemented anyway
router.get("/", async (req, res) => {
    try {
        const data = await User.findAll({
            include: [{ model: Post }, { model: Comment }] // Show all posts and comments of all users
        });

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

// Get one user given an id
router.get("/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const data = await User.findByPk(userId, {
            include: [{ model: Post }, { model: Comment }] // Show all posts and comments of a user
        })

        if (data) {
            const user = data.get({ plain: true });
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "There are no users in the database"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
})


// Create new user
router.post("/", async (req, res) => {
    
})


module.exports = router;
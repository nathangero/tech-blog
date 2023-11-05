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
    try {
        const data = await User.create(req.body);
        
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = data.id; // Save the id in the session to use when making a post or comment

            res.status(200).json(data);
        })
    } catch (error) {
        res.status(500).json(error);
    }
});

// Login a user
router.post("/login", async (req, res) => {
    const email = req.body.email;
    const enteredPassword = req.body.password;
    console.log("email:", email);
    console.log("enteredPassword:", enteredPassword);
    
    try {
        const data = await User.findOne({
            where: {
                email: email
            }
        });

        // Check if user exists
        if (!data) {
            res.status(404).json({ message: "User doesn't exist. Please try another login or sign up." });
            return;
        }

        // Check if password is correct
        const isPasswordValid = data.comparePassword(enteredPassword);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true; // remember user's login session
            req.session.userId = data.id; // Save the id in the session to use when making a post or comment

            res.status(200).json({ user: data, message: "You're logged in"}); // Send back user data
        })

    } catch (error) {
        res.status(500).json(error);
    }
});


// Logout
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


// Update user's name
router.put("/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const data = await User.update(req.body, {
            where: {
                id: userId
            }
        });

        if (data[0]) {
            res.status(200).json({ message: "Successfully changed username" });
        } else {
            res.status(404).json({ "message": `No user with id ${userId}` });
        }
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;
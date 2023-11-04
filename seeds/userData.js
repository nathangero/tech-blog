const { User } = require("../models");

const userData = [
    {
        username: "Billy",
        email: "bily@bob.com",
        password: "password1"
    },
    {
        username: "Joe",
        email: "joe@dane.com",
        password: "password2"
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
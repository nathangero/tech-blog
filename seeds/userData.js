const bcrypt = require("bcrypt");
const { User } = require("../models");
require("dotenv").config();

const userData = [
    {
        username: "Billy",
        password: bcrypt.hashSync("password1", parseInt(process.env.SALT_ROUNDS))
    },
    {
        username: "Joe",
        password: bcrypt.hashSync("password2", parseInt(process.env.SALT_ROUNDS))
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
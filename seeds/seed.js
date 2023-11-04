const sequelize = require("../config/connection");
const seedUser = require("./userData");
const seedPost = require("./postData");
const seedComment = require("./commentData");

async function seedAll() {
    await sequelize.sync({ force: true });

    await seedUser();
    console.log("---- SEEDED USERS ----\n\n");

    await seedPost();
    console.log("---- SEEDED POSTS ----\n\n");

    await seedComment();
    console.log("---- SEEDED COMMENTS ----");

    process.exit(0);
};

seedAll();
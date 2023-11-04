const sequelize = require("../config/connection");
const seedUser = require("./userData");
const seedPost = require("./postData");

async function seedAll() {
    await sequelize.sync({ force: true });

    await seedUser();
    console.log("---- SEEDED USERS ----");

    await seedPost();
    console.log("---- SEEDED POSTS ----");

    
    console.log("---- SEEDED COMMENTS ----");

    process.exit(0);
};

seedAll();
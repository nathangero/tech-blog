const sequelize = require("../config/connection");
const seedUser = require("./userData");

async function seedAll() {
    await sequelize.sync({ force: true });

    await seedUser();

    process.exit(0);
};

seedAll();
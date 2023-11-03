const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {

}

/*
    id, username, password
*/

User.init(
    {

    },
    {
        hooks: {
            async beforeCreate(newUserData) {

            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
    }
);

module.exports = User;
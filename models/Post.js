const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Post extends Model {

}

/*
    id, title, description, date(sql should do this automatically), fk_user_id
*/

Post.init(
    {

    },
    {
        hooks: {

        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: "post",
    }
);

module.exports = Post;
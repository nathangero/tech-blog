const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Comment extends Model {

}

/*
    id, description, fk_post_id, fk_user_id
*/

Comment.init(
    {

    },
    {
        hooks: {

        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: "comment",
    }
);

module.exports = Comment;
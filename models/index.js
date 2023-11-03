// All models are 1 to many. NO many to many
/*
User have many posts
Post have many comments
Comments belong to many Users and Posts

*/

const User = require("./User");



module.exports = { User }
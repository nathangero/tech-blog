const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require("dotenv").config();

const sequelize = require("./config/connection");
const routes = require("./controllers");
const helpers = require("./utils/helpers.js")

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: parseInt(process.env.COOKIE_AGE),
        secure: false,
        sameSite: 'strict',
    },
    store: new SequelizeStore({
        db: sequelize,
    }),
}

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
// app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log("Listening to port 3001"));
});
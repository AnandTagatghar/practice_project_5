const express = require("express");
const dbgr = require("debug")("development:app");
const path = require("path");
const indexRouter = require(path.join(__dirname, '/routes/indexRouter'));
const usersRouter = require(path.join(__dirname, '/routes/usersRouter'));
const ownerRouter = require(path.join(__dirname, '/routes/ownerRouter'));
const productRouter = require(path.join(__dirname, '/routes/productRouter'));
require(path.join(__dirname, "/config/mongooseConnection"));
require("dotenv").config();
const ejs = require("ejs");
const expressSession = require("express-session");
const flash = require("connect-flash");
const static = path.join(__dirname, "static");

const app = express();

app.use(express.static(static));
app.set("view engine", "ejs");
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET_KEY
}));
app.use(flash());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/owner", ownerRouter);
app.use("/product", productRouter);


app.listen(3000, (req, res) => {
    dbgr(`Listening at port 3000`);
});
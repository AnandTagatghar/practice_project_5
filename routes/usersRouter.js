const express = require("express");
const dbgr = require("debug")("development:usersRouter");
const usersRouter = express.Router();
const path = require("path");
const {
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

usersRouter.use(express.json());
usersRouter.use(express.urlencoded());

usersRouter.get("/", (req, res) => {
  res.send(`get users router`);
});

usersRouter.post("/createUser", createUser);

usersRouter.post("/loginUser", loginUser);

usersRouter.get("/logoutUser", logoutUser);

module.exports = usersRouter;

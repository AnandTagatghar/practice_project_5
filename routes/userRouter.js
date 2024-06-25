const express = require("express");
const dbgr = require("debug")('development:userRouter');

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
    res.send("hey it is working");
});

module.exports = userRouter;
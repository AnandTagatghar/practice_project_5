const express = require("express");
const dbgr = require("debug")('development:userRouter');

const ownerRouter = express.Router();

ownerRouter.get("/", (req, res) => {
    res.send("hey it is working");
});

module.exports = ownerRouter;
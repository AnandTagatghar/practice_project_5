const express = require("express");
const dbgr = require("debug")('development:userRouter');

const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
    res.send("hey it is working");
});

module.exports = productsRouter;
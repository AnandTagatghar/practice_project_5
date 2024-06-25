const express = require("express");
const dbgr = require("debug")('development:app');
const path = require("path");
const userRouter = require(path.join(__dirname, "/routes/userRouter"));
const ownerRouter = require(path.join(__dirname, "/routes/ownerRouter"));
const productsRouter = require(path.join(__dirname, "/routes/productsRouter"));
const db = require(path.join(__dirname, "/config/mongoose-connection"));

const app = express();

app.use("/users", userRouter);
app.use("/owners", ownerRouter);
app.use("/products", productsRouter);

app.listen(3000, (req, res) => {
    dbgr(`Listening at port 3000`);
});
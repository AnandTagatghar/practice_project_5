const express = require("express");
const dbgr = require("debug")("development:indexRouter");
const indexRouter = express.Router();
const productModel = require("../models/product-model");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const cookieParser = require("cookie-parser");
const { vars } = require("../utils/basicVars");
const userModel = require("../models/user-model");

indexRouter.use(cookieParser());

indexRouter.get("/", (req, res) => {
  let basicVars = vars();
  basicVars.error = req.flash("error");
  res.render(`index`, basicVars);
});

indexRouter.get("/shop", isLoggedIn, async (req, res) => {
  let basicVars = vars();
  basicVars.products = await productModel.find({});
  basicVars.user = await userModel.findOne({ _id: req.user.id });

  basicVars.success = req.flash("success");

  res.render("shop", basicVars);
});

module.exports = indexRouter;

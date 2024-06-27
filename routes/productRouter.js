const express = require("express");
const dbgr = require("debug")("development:productRouter");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const { upload } = require("../config/multerConfig");
const { vars } = require("../utils/basicVars");

const productRouter = express.Router();

productRouter.get("/createProduct", isLoggedIn, (req, res) => {
  let basicVars = vars();
  basicVars.isOwner = true;
  basicVars.success = req.flash("success");
  res.render("createProduct", basicVars);
});

productRouter.post(
  "/createProduct",
  isLoggedIn,
  upload.single("image"),
  async (req, res) => {
    let basicVars = vars();

    let {
      productName,
      productPrice,
      discountPrice,
      bgColor,
      textColor,
      panelColor,
    } = req.body;

    try {
      let product = await productModel.create({
        productName,
        productPrice,
        discountPrice,
        bgColor,
        textColor,
        panelColor,
        image: req.file.buffer,
      });

      req.flash("success", "Product Created Successfully");
      res.redirect("/product/createProduct");
    } catch (err) {
      res.send(err.message);
    }
  }
);

productRouter.get("/addCart/:productId", isLoggedIn, async (req, res) => {
  try {
    let user = await userModel.findOne({ _id: req.user.id });
    let product = await productModel.findOne({ _id: req.params.productId });

    user.cart.push(product._id);
    await user.save();

    req.flash("success", "Item added to cart");
    res.redirect("/shop");
  } catch (err) {
    res.send(err.message);
  }
});

productRouter.get('/cart', isLoggedIn, async(req, res) => {
    let basicVars = vars();

    let user = await userModel.findOne({ _id: req.user.id }).populate("cart");

    basicVars.user = user;
    res.render('cart', basicVars);
});

module.exports = productRouter;

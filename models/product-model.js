const mongoose = require("mongoose");

const productModel = mongoose.Schema({
    image: Buffer,
    productName: String,
    productPrice: Number,
    discountPrice: {
        type: Number,
        default: 0
    },
    bgColor: String,
    textColor: String,
    panelColor: String,
});

module.exports = mongoose.model("products", productModel);
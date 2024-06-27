const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: String,
    password: String,
    orders: {
        type: Array,
        default: []
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    }],
    contact: Number,
    profile: String
});

module.exports = mongoose.model("user", userModel);
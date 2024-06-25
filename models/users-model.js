const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    contact: Number,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    profile: String,
    orders: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("users", userModel);
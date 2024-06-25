const mongoose = require("mongoose");

const ownerModel = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: String,
    password: String,
    products: {
        type: Array,
        default: []
    },
    profile: String,
    gstin: String
});

module.exports = mongoose.model("users", ownerModel);
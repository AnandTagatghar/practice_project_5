const ownerModel = require("../models/owner-model");
const dbgr = require("debug")('development:checkOwner');

const checkOwners = async (req, res, next) => {
    let owners = await ownerModel.find({});
    dbgr(owners);
    if (owners.length > 0) {
        req.flash("error", "This product has a owner, please login.");
        res.redirect("/");
    } else {
        next();
    }
};

module.exports = {
    checkOwners
}
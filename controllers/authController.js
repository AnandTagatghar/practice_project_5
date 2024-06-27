const bcrypt = require("bcrypt");
const dbgr = require("debug")("development:authController");
const path = require("path");
const userModel = require(path.join(__dirname, "../models/user-model"));
const ownerModel = require(path.join(__dirname, "../models/owner-model"));
const { cookieGenerator } = require(path.join(
  __dirname,
  "../utils/generateCookie"
));

const createUser = async (req, res) => {
  let { fullname, email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (user) {
    req.flash("error", "Email alrady exists");

    return res.status(401).redirect(`/`);
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      req.flash("error", err.message);
      return res.redirect(`/`);
    } else {
      let user = await userModel.create({
        fullname,
        email,
        password: hash,
      });

      let token = cookieGenerator(user);
      res.cookie("token", token).redirect("/shop");
    }
  });
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) {
    req.flash("error", `Please register yourself first.`);
    return res.status(403).redirect(`/`);
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      req.flash("error", `${err.message}`);
      return res.status(500).send(err.message);
    }

    if (result) {
      let token = cookieGenerator(user);

      res.cookie("token", token).redirect(`/shop`);
    } else {
      req.flash("error", `Incorrect Password`);
      res.status(401).redirect("/");
    }
  });
};

const logoutUser = (req, res) => {
  res.cookie("token", "").redirect(`/`);
};

const createOwner = async (req, res) => {
  let { fullname, email, password } = req.body;

  let owner = await ownerModel.findOne({ email });
  if (owner) {
    req.flash("error", "Email alrady exists");

    return res.status(401).redirect(`/product/createOwner`);
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      req.flash("error", err.message);
      return res.redirect(`/`);
    } else {
      let owner = await ownerModel.create({
        fullname,
        email,
        password: hash,
      });

      let token = cookieGenerator(owner);
      res.cookie("token", token).redirect("/product/createProduct");
    }
  });
};

const loginOwner = async (req, res) => {
  let { email, password } = req.body;

  let owner = await ownerModel.findOne({ email });
  if (!owner) {
    req.flash("error", `Please register yourself as a Owner.`);
    return res.status(403).redirect(`/owner/loginOwner`);
  }

  bcrypt.compare(password, owner.password, (err, result) => {
    if (err) {
      req.flash("error", `${err.message}`);
      return res.status(500).send(err.message);
    }

    if (result) {
      let token = cookieGenerator(owner);

      res.cookie("token", token).redirect(`/product/createProduct`);
    } else {
      req.flash("error", `Incorrect Password`);
      res.status(401).redirect("/owner/loginOwner");
    }
  });
};

const logoutOwner = (req, res) => {
  res.cookie("token", "").redirect(`/owner/loginOwner`);
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  createOwner,
  loginOwner,
  logoutOwner
};

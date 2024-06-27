const express = require("express");
const dbgr = require("debug")("development:ownerRouter");
const { createOwner, loginOwner, logoutOwner } = require("../controllers/authController");
const { checkOwners } = require("../middlewares/checkOwners");
const { vars } = require("../utils/basicVars");

const ownerRouter = express.Router();

ownerRouter.use(express.json());
ownerRouter.use(express.urlencoded());

ownerRouter.get("/createOwner", async (req, res) => {
  let success = req.flash("success");

  return res.render(`index`, { isOwner: true, error: "" });
});

ownerRouter.post(`/createOwner`,checkOwners, createOwner);

ownerRouter.get(`/loginOwner`, async (req, res) => {
  let basicVars = vars();
  basicVars.isOwner = true;
  basicVars.error = req.flash("error");
  res.render("index", basicVars);
});

ownerRouter.post(`/loginOwner`, loginOwner);

ownerRouter.get(`/logoutOwner`, logoutOwner);


module.exports = ownerRouter;

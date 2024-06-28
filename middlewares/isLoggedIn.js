const jwt = require("jsonwebtoken");
const dbgr = require("debug")("development:isLoggedIn");

const isLoggedIn = (req, res, next) => {
  if (req.cookies.token) {
    let data = jwt.verify(
      req.cookies.token,
      process.env.JWT_KEY,
      (err, data) => {
        if (err) {
          req.flash("error", "Error " + err);
          return res.cookie("token", "").redirect("/");
        } else {
          if (data.user) {
            req.user = data;
            next();
          } else {
            req.flash("error", "You must login first");
            res.redirect("/");
          }
        }
      }
    );
  } else {
    dbgr("error2");
    req.flash("error", "You must login first");
    res.redirect("/");
  }
};

module.exports = {
  isLoggedIn,
};

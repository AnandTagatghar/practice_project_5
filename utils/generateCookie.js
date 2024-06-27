const jwt = require("jsonwebtoken");

const cookieGenerator = (user) => {
    return jwt.sign({ user: user.email, id: user._id }, process.env.JWT_KEY);
}

module.exports = {
    cookieGenerator
}
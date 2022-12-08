const jwt = require("jsonwebtoken");
require("dotenv").config();

function signToken(user) {
  return jwt.sign(
    { id: user._id, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.EXPRIRE_IN_TOKEN,
    }
  );
}

module.exports = { signToken };

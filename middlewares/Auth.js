const jwt = require("jsonwebtoken");

function veryfiToken(req, res, next) {
  const token = req.header["x-access-token"];
  if (!token) return res.status(403).json({ message: "Token is require" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    error.toString();
    return res.status(401).json({ message: " Invalid Token" });
  }
}

module.exports = { veryfiToken };

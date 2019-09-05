const jwt = require("jsonwebtoken");
const config = require("config");

const jwtMiddleware = (req, res, next) => {
  //Get Token from header
  const token = req.header("x-auth-token");

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, auth denied" });
  } else {
    try {
      const decoded = jwt.verify(token, config.get("secret"));
      req.user = decoded.user;
      next();
    } catch (error) {
      console.error(error.message);
      res.status(401).json({ msg: "Invalid token" });
    }
  }
};

module.exports = jwtMiddleware;

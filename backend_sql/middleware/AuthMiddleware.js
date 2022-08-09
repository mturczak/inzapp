require("dotenv").config();
const { verify } = require("jsonwebtoken");


const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.status(401).json({ error: "User not logged in" });

  try {
    const validToken = verify(accessToken, process.env.JWT_KEY);
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

module.exports = { validateToken };

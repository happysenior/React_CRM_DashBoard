import jwt from "jsonwebtoken";
import config from "../config/config";
import User from "../models/user";

function generateToken(user) {
  console.log("user==============>");
  console.log(user);
  const token = jwt.sign(
    {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    config.auth.secretKey,
    {
      expiresIn: "5d",
    }
  );
  return token;
}

function authorization(req, res, next) {
  var token = req.headers["authorization"];
  if (token && token.startsWith("Bearer ")) token = token.substring(7);
  if (token) {
    jwt.verify(token, config.auth.secretKey, function (err, decoded) {
      if (err) {
        res.status(401).end();
      } else {
        req.userId = decoded.id;
        req.userRole = decoded.role;
        return next();
      }
    });
  } else {
    res.status(401).end();
  }
}

async function adminAuth(req, res, next) {
  const user = await User.findById(req.userId);
  if (user.role != "admin") {
    res.status(401).end();
  } else {
    req.userRole = "admin";
    return next();
  }
}

module.exports = {
  generateToken,
  authorization,
  adminAuth,
};

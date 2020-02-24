import jwt from "jsonwebtoken";
import config from "../config/config";

function generateToken(user) {
  const token = jwt.sign(
    {
      id: user.id
    },
    config.auth.secretKey,
    {
      expiresIn: "5d"
    }
  );
  return token;
}

function authorization(req, res, next) {
  var token = req.headers["authorization"];
  if (token && token.startsWith("Bearer ")) token = token.substring(7);
  if (token) {
    jwt.verify(token, config.auth.secretKey, function(err, decoded) {
      if (err) {
        res.status(401).end();
      } else {
        req.userId = decoded.id;
        return next();
      }
    });
  } else {
    res.status(401).end();
  }
}

module.exports = {
  generateToken,
  authorization
};

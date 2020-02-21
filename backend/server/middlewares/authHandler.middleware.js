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
  console.log(req.headers);
  console.log(req.body);
  var token = req.headers["authorization"];
  if (token && token.startsWith("Bearer ")) token = token.substring(7);
  console.log(token);
  if (token) {
    jwt.verify(token, config.auth.secretKey, function(err, decoded) {
      console.log(decoded);
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

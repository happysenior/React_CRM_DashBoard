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
        // api.error(res, "Token consistency error", "401");
        api.error(res, err.message, "401");
      } else {
        req.userId = decoded.id;
        return next();
      }
    });
  } else {
    api.error(res, "Token not provided", "401");
  }
}

module.exports = {
  generateToken,
  authorization
};

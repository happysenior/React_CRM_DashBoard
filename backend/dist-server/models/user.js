"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var crypto = require("crypto");

var Schema = _mongoose["default"].Schema;
var UserSchema = new Schema({
  email: {
    type: String,
    "default": ""
  },
  firstName: {
    type: String,
    "default": ""
  },
  lastName: {
    type: String,
    "default": ""
  },
  hashedPassword: {
    type: String,
    "default": ""
  },
  salt: {
    type: String,
    "default": ""
  }
});

var validatePresenceOf = function validatePresenceOf(value) {
  return value && value.length;
};

UserSchema.virtual("password").set(function (password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashedPassword = this.encryptPassword(password);
}).get(function () {
  return this._password;
});
UserSchema.path("firstName").validate(function (name) {
  return name.length;
}, "first name cannot be blank");
UserSchema.path("lastName").validate(function (name) {
  return name.length;
}, "last name cannot be blank");
UserSchema.path("email").validate(function (email) {
  return email.length;
}, "Email cannot be blank");
UserSchema.path("email").validate(function (email) {
  var _this = this;

  return new Promise(function (resolve) {
    var User = _mongoose["default"].model("User"); // Check only when it is a new user or when email field is modified


    if (_this.isNew || _this.isModified("email")) {
      User.find({
        email: email
      }).exec(function (err, users) {
        return resolve(!err && !users.length);
      });
    } else resolve(true);
  });
}, "Email `{VALUE}` already exists");
UserSchema.path("hashedPassword").validate(function (hashedPassword) {
  return hashedPassword.length && this._password.length;
}, "Password cannot be blank");
UserSchema.pre("save", function (next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password)) {
    next(new Error("Invalid pasword"));
  } else {
    next();
  }
});
UserSchema.methods = {
  authenticate: function authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },
  makeSalt: function makeSalt() {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
  encryptPassword: function encryptPassword(password) {
    if (!password) return "";

    try {
      var hashedPassword = crypto.createHmac("sha256", this.salt).update(password).digest("hex");
      return hashedPassword;
    } catch (err) {
      throw err;
    }
  }
};
UserSchema.statics = {
  load: function load(options, cb) {
    options.select = options.select || "firstName";
    return this.findOne(options.criteria).select(options.select).exec(cb);
  }
};

var _default = _mongoose["default"].model("User", UserSchema);

exports["default"] = _default;
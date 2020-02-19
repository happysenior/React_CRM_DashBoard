"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var UserSchema = new Schema({
  name: {
    type: String,
    "default": ""
  },
  email: {
    type: String,
    "default": ""
  },
  userName: {
    type: String,
    "default": ""
  },
  hassedPassword: {
    type: String,
    "default": ""
  }
});

var _default = _mongoose["default"].model('User', UserSchema);

exports["default"] = _default;
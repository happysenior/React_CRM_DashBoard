"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./controllers/auth.controller"));

var _prospect = _interopRequireDefault(require("./controllers/prospect.controller"));

var _conversation = _interopRequireDefault(require("./controllers/conversation.controller"));

var _webhook = _interopRequireDefault(require("./controllers/webhook.controller"));

var _authHandler = _interopRequireDefault(require("./middlewares/authHandler.middleware"));

var router = (0, _express.Router)();
router.use("/auth", _auth["default"]);
router.use("/prospects", _authHandler["default"].authorization, _prospect["default"]);
router.use("/conversations", _authHandler["default"].authorization, _conversation["default"]);
router.use("/webhook", _webhook["default"]);
var _default = router;
exports["default"] = _default;
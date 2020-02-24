"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _login = _interopRequireDefault(require("./controllers/login.controller"));

var _logout = _interopRequireDefault(require("./controllers/logout.controller"));

var _prospect = _interopRequireDefault(require("./controllers/prospect.controller"));

var _messaging = _interopRequireDefault(require("./controllers/messaging.controller"));

var _conversation = _interopRequireDefault(require("./controllers/conversation.controller"));

var _authHandler = _interopRequireDefault(require("./middlewares/authHandler.middleware"));

var router = (0, _express.Router)();
router.use("/auth", [_login["default"], _logout["default"]]);
router.use("/prospects", _authHandler["default"].authorization, _prospect["default"]);
router.use("/conversations", _authHandler["default"].authorization, _conversation["default"]);
router.use("/webhook/", _messaging["default"]);
var _default = router;
exports["default"] = _default;
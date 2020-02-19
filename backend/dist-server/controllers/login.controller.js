"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _express = require("express");

var HttpStatus = _interopRequireWildcard(require("http-status-codes"));

var _expressValidator = require("express-validator");

var _user = _interopRequireDefault(require("../models/user"));

var loginRouter = (0, _express.Router)();
loginRouter.route("/login").post([(0, _expressValidator.check)("email").isEmail(), (0, _expressValidator.check)("password").isLength({
  min: 1,
  max: 255
})],
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var user, err;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user["default"].find({
              email: "happinessalex231@gmail.com"
            });

          case 3:
            user = _context.sent;
            res.status(HttpStatus.OK).json({
              success: true,
              user: user
            }).end();
            _context.next = 12;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            err = {
              success: false,
              code: HttpStatus.BAD_REQUEST,
              error: _context.t0
            };
            next(err);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var _default = loginRouter;
exports["default"] = _default;
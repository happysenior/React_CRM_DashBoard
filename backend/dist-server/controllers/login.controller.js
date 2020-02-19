"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var HttpStatus = _interopRequireWildcard(require("http-status-codes"));

var _expressValidator = require("express-validator");

var _user = _interopRequireDefault(require("../models/user"));

var _authHandler = _interopRequireDefault(require("../middlewares/authHandler.middleware"));

var loginRouter = (0, _express.Router)();
loginRouter.route("/login").post([(0, _expressValidator.check)("email").isEmail(), (0, _expressValidator.check)("password").exists({
  checkNull: false
}).isLength({
  min: 1,
  max: 255
})],
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var validationErrors, user, token, err;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            validationErrors = (0, _expressValidator.validationResult)(req);

            if (validationErrors.isEmpty()) {
              _context.next = 5;
              break;
            }

            res.status(HttpStatus.BAD_REQUEST).end();
            return _context.abrupt("return");

          case 5:
            _context.next = 7;
            return _user["default"].findOne({
              email: req.body.email
            });

          case 7:
            user = _context.sent;

            if (user) {
              if (user.authenticate(req.body.password) === true) {
                token = _authHandler["default"].generateToken(user);
                res.status(HttpStatus.OK).send({
                  success: true,
                  user: {
                    firstName: user.firstName,
                    lastName: user.lastName
                  },
                  token: token
                }).end();
              } else {
                res.status(HttpStatus.UNAUTHORIZED).end();
              }
            } else {
              res.status(HttpStatus.NOT_FOUND).end();
            }

            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            err = {
              success: false,
              code: HttpStatus.BAD_REQUEST,
              error: _context.t0
            };
            next(err);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var _default = loginRouter;
exports["default"] = _default;
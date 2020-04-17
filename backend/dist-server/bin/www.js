#!/usr/bin/env node

/**
 * Module dependencies.
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _app = _interopRequireDefault(require("../app"));

var _http = _interopRequireDefault(require("http"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _chalk = _interopRequireDefault(require("chalk"));

var _config = _interopRequireDefault(require("../config/config"));

var _terminalLink = _interopRequireDefault(require("terminal-link"));

var _socket = require("../socket");

var _cron = _interopRequireDefault(require("../cron"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["{green.bold Connected to } {yellow ", "}"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var log = console.log;
var connection = connect();
connection.on("error", console.log).on("disconnected", connect).once("open", listen);
var server;
var port;

function listen() {
  log((0, _chalk["default"])(_templateObject(), _config["default"].db.host));
  /**
   * Get port from environment and store in Express.
   */

  port = normalizePort(process.env.PORT || "8000");

  _app["default"].set("port", port);
  /**
   * Create HTTP server.
   */


  server = _http["default"].createServer(_app["default"]);
  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);

  _socket.socketServer.init(server);

  _cron["default"].init();
}

function connect() {
  var options = {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  _mongoose["default"].connect(_config["default"].db.host, options);

  _mongoose["default"].set("useFindAndModify", false);

  return _mongoose["default"].connection;
}
/**
 * Normalize a port into a number, string, or false.
 */


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
/**
 * Event listener for HTTP server "error" event.
 */


function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port; // handle specific listen errors with friendly messages

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;

    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;

    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */


function onListening() {
  log(_chalk["default"].green("Server started"));
}
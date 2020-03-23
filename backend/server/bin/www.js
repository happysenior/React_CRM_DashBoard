#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from "../app";
import http from "http";
import mongoose from "mongoose";
import chalk from "chalk";
import config from "../config/config";
import terminalLink from "terminal-link";
import { socketServer } from "../socket";

const log = console.log;
const connection = connect();

connection
  .on("error", console.log)
  .on("disconnected", connect)
  .once("open", listen);

var server;
var port;

function listen() {
  log(chalk`{green.bold Connected to } {yellow ${config.db.host}}`);

  /**
   * Get port from environment and store in Express.
   */

  port = normalizePort(process.env.PORT || "8000");
  app.set("port", port);

  /**
   * Create HTTP server.
   */

  server = http.createServer(app);
  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);

  socketServer.init(server);
}

function connect() {
  var options = {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  mongoose.connect(config.db.host, options);
  mongoose.set("useFindAndModify", false);

  return mongoose.connection;
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

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
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
  var prefix = "http://";
  if (process.env.NODE_ENV === "production") prefix = "https://";
  const link = terminalLink(
    chalk.green(`Server started at `),
    `${prefix}${config.host}:${config.port}`
  );
  log(link);
}

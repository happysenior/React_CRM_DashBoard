"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var isTestEnvironment = process.env.NODE_ENV === "test";
var _default = {
  name: "real estate crm",
  version: "1.0",
  host: "localhost" || "127.0.0.1",
  environment: process.env.NODE_ENV || "development",
  port: (isTestEnvironment ? "8001" : "8000") || "8000",
  pagination: {
    page: 1,
    maxRows: 20
  },
  auth: {
    secretKey: "4C31F7EFD6857D91E729165510520424" || "4C31F7EFD6857D91E729165510520424"
  },
  db: {
    host: isTestEnvironment ? "localhost" : "mongodb://localhost/real_estate_crm",
    port: isTestEnvironment ? "3306" : "27017",
    username: isTestEnvironment ? "root" : "root",
    password: isTestEnvironment ? "root" : "root",
    database: isTestEnvironment ? "crm_test" : "crm"
  },
  logging: {
    dir: "logs" || "logs",
    level: "debug" || "debug"
  }
};
exports["default"] = _default;
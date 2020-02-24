const isTestEnvironment = process.env.NODE_ENV === "test";
import {
  APP_HOST,
  APP_PORT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  TEST_APP_PORT,
  TEST_DB_HOST,
  TEST_DB_NAME,
  TEST_DB_PASSWORD,
  TEST_DB_PORT,
  TEST_DB_USERNAME,
  LOGGING_DIR,
  LOGGING_LEVEL,
  SECRET_KEY,
  SIGNALWIRE_SPACE,
  SIGNALWIRE_PROJECT_ID,
  SIGNALWIRE_TOKEN,
  SIGNALWIRE_MESSAGING_NUMBER
} from "@env";

export default {
  name: "real estate crm",
  version: "1.0",
  host: APP_HOST || "127.0.0.1",
  environment: process.env.NODE_ENV || "development",
  port: (isTestEnvironment ? TEST_APP_PORT : APP_PORT) || "8000",
  pagination: {
    page: 1,
    maxRows: 20
  },
  auth: {
    secretKey: SECRET_KEY || "4C31F7EFD6857D91E729165510520424"
  },
  db: {
    host: isTestEnvironment ? TEST_DB_HOST : DB_HOST,
    port: isTestEnvironment ? TEST_DB_PORT : DB_PORT,
    username: isTestEnvironment ? TEST_DB_USERNAME : DB_USERNAME,
    password: isTestEnvironment ? TEST_DB_PASSWORD : DB_PASSWORD,
    database: isTestEnvironment ? TEST_DB_NAME : DB_NAME
  },
  logging: {
    dir: LOGGING_DIR || "logs",
    level: LOGGING_LEVEL || "debug"
  },
  signalwire: {
    space: SIGNALWIRE_SPACE,
    token: SIGNALWIRE_TOKEN,
    projectId: SIGNALWIRE_PROJECT_ID,
    messagingNumber: SIGNALWIRE_MESSAGING_NUMBER
  }
};

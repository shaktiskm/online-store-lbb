"use strict";

// eslint disable no-var

var environmentVariables = {
  "OSLBB_MONGO_CONNECTION_STRING": process.env.OSLBB_MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/online_store_lbb",
  "OSLBB_SECRET_KEY": process.env.OSLBB_SECRET_KEY || "45a3c06e-ab7e-4256-9e9c-da2ac168ef25"
};

module.exports = environmentVariables;

// eslint enable no-var

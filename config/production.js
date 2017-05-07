"use strict";

// eslint disable no-var

var environmentVariables = require("./environmentVariables"),
  config = {
    "http": {
      "protocol": "http",
      "domain": "127.0.0.1",
      "port": environmentVariables.OSLBB_PORT
    },
    "appName": "online-store-lbb",
    "mongoDb": {
      "connectionString": environmentVariables.OSLBB_MONGO_CONNECTION_STRING,
      "operationTimeout": 4000,
      "connectionOptions": {
        "server": {
          "poolSize": 5,
          "socketOptions": {
            "autoReconnect": true,
            "keepAlive": 0
          },
          "reconnectTries": 30,
          "reconnectInterval": 1000
        }
      },
      "promiseTimeout": 4500
    },
    "authorization": {
      "authorize": true
    },
    "environmentVariableChecker": {
      "isEnabled": false
    },
    "urlPrefix": "/v1",
    "secretKey": environmentVariables.OSLBB_SECRET_KEY
  };

module.exports = config;

// eslint enable no-var

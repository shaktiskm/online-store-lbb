const express = require("express"),
  bodyparser = require("body-parser"),
  methodOverride = require("method-override"),
  checkEnvironmentVariables = require("./util/checkEnvironmentVariables"),
  ApiError = require("./util/apiError"),
  mwAllowCrossDomain = require("./middleware_services/mwAllowCrossDomain"),
  mwAuthenticateRequest = require("./middleware_services/mwAuthenticateRequest"),
  mwErrorHandler = require("./middleware_services/mwErrorHandler"),
  mwAddRequestId = require("./middleware_services/mwAddRequestId"),
  mwGenerateUserToken = require("./middleware_services/mwGenerateUserToken"),
  problem2Router = require("./endpoints/problem2"),
  productRouter = require("./endpoints/product");


let {NODE_ENV} = process.env,
  nodeEnv = NODE_ENV || "local",
  config = Object.freeze(require("../config/" + nodeEnv)),
  urlPrefix = config.urlPrefix,
  app = express(),
  environmentVariables = require("../config/environmentVariables");

// Checks the required enviro// Defines top middleware and routesnment variables
// Logs the missing environment variables and exit the application
if (config.environmentVariableChecker.isEnabled) {
  checkEnvironmentVariables(environmentVariables);
}

// set the relevant config app wise
app.set("port", config.http.port);
app.set("secretKey", config.secretKey);

app.use(mwAllowCrossDomain);
app.use(bodyparser.json());

// HealthCheck Endpoint --> GET ...v1/healthcheck
app.get(`${urlPrefix}/healthcheck`, (req, res) => {
  res.send({"msg": "OK"});
});

// App routes here
app.use(mwAddRequestId);

app.use("/problem2", problem2Router);

// JWT Authentication Implemented -- Generate Token
app.post("/generateToken", mwGenerateUserToken);

// JWT Authentication Implemented -- Verify Token & User
app.use(mwAuthenticateRequest);

// Simple Product Add, Delete, Edit, Search Routes
app.use("/products", productRouter);

app.use((req, res, next) => {
  let apiError = new ApiError("NotFound", "Resource doesn't exist", "", 404);

  return next(apiError);
});
app.use(methodOverride);
app.use(mwErrorHandler);

app.listen(app.get("port"), () => {
  console.log(`Server is listening on port --> ${app.get("port")}`);
});

module.exports = app;

const JWT = require("../util/JWTImplementaion"),
  ApiError = require("../util/apiError");

function mwGenerateUserToken(req, res, next) {
  let secret = req.app.get("secretKey"),
    jwtInstance = new JWT(secret),
    payload = req.body,
    payloadData,
    token,
    options = {
      "expiresIn": "10h"
    };

  if (!payload.userId) {
    console.error("mwAuthenticateRequest()//Unable to generate the token");
    return next(new ApiError(req.id, "Bad Request", "Token Generation Failed because of userId", "", 400));
  }

  payloadData = {
    "userId": payload.userId
  };

  try {
    token = jwtInstance.sign(payloadData, options);

    console.log("mwAuthenticateRequest()//Authentication Token generated successfully", token);
    let successResponse = {
      "reqId": req.id,
      "token": token,
      "status": "success"
    };

    res.status(200).send(successResponse);

  } catch (err) {
    console.error("mwAuthenticateRequest()//Unable to generate the token", err);
    return next(new ApiError(req.id, "Bad Request", "Token Generation Failed", "", 400));
  }
}

module.exports = mwGenerateUserToken;

const ApiError = require("../util/apiError");

function mwDeletePayloadValidation(req, res, next) {
  if ((req.body !== null) && (Object.keys(req.body).length > 0)) {

    console.log("mwDeletePayloadValidation()//Payload is not allowed for deletion");
    let apiErr = new ApiError(req.id, "BadRequest", "Cannot have payload in delete request", "", 400);

    return next(apiErr);

  }
  // Set body to undefined
  req.body = undefined;
  console.log("mwDeletePayloadValidation()//Payload validation passed for deletion, set to undefined");

  next();
}

module.exports = mwDeletePayloadValidation;

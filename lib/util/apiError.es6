/**
 * Represents a service error.
 * @class
 */
class ApiError extends Error {

  /**
   * @constructor
   * @param {string} reqId The Unique Identifier for every request
   * @param {string} errorType The type of the error. Currently either "ValidationError" or "Error".
   * @param {Array<string>} messages Collection of error messages.
   * @param {Error} innerError The original native JavaScript error.
   * @param {Number} statusCode the Http status code for JavaScript error.
   */
  constructor(reqId, errorType, messages, innerError, statusCode) {

    super();

    this.reqId = reqId;

    /** @member {string} errorType The type of the error. Currently either "ValidationError" or "Error". */
    this.errorType = errorType;

    this.name = "ApiError";

    /** @member {string} messages Collection of error messages. */
    this.messages = messages;

    /** @member {Error} innerError The original native JavaScript error. */
    this.innerError = innerError;

    this.statusCode = statusCode;
  }
}

module.exports = ApiError;

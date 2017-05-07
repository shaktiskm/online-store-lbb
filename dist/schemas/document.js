"use strict";

var validations = require("./validations");

var document = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "array",
  "minItems": 1,
  "uniqueItems": true,
  "items": {
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "_id": validations.notEmptyString,
      "name": validations.notEmptyString,
      "category": validations.notEmptyString
    },
    "required": ["_id", "name", "category"]
  }
};

module.exports = document;
//# sourceMappingURL=document.js.map

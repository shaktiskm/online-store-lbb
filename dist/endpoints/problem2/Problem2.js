"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var documentSchema = require("../../schemas/document"),
    ApiError = require("../../util/apiError");

var protectedService = void 0;

var Problem2Service = function () {
  function Problem2Service(dbService, genericValidatorIns) {
    _classCallCheck(this, Problem2Service);

    this._dbService = dbService;
    this._genericValidator = genericValidatorIns;
  }

  _createClass(Problem2Service, [{
    key: "saveAssociatedCategory",
    value: function saveAssociatedCategory(req, res, next) {
      var payload = req.body,
          isSchemaValidated = false,
          distinctCategoryIds = void 0,
          rejectedPayloadDocs = [];

      try {
        isSchemaValidated = this._genericValidator.schemaValidation(payload, documentSchema);

        if (isSchemaValidated) {
          console.log("saveAssociatedCategory()// Payload Validation Successful.");
          distinctCategoryIds = this.getDistinctCategories(payload);

          this.checkDBExistingCategories([].concat(_toConsumableArray(distinctCategoryIds))).then(function (categoryArr) {

            var finalDocToSave = void 0,
                categoryIds = categoryArr.map(function (catObj) {
              return catObj._id;
            });

            finalDocToSave = payload.filter(function (item) {
              if (categoryIds.indexOf(item.category) !== -1) {
                return true;
              }
              rejectedPayloadDocs.push(item);
              return false;
            });

            return finalDocToSave;
          }).then(this.saveDocuments.bind(this)).then(function (success) {
            var response = {
              "status": "success",
              "rejectedDocuments": rejectedPayloadDocs
            };

            console.log("Documents saved successfully...", success.result);

            res.status(200).send(response);
          }).catch(function (err) {
            if (err.name === "MongoError") {
              var apiError = new ApiError(req.id, "DuplicateError", "Duplicate Document Error", "", 400);

              console.log("saveAssociatedCategory()// Going to create duplicate document in db --> ", err.message);
              return next(apiError);
            }
            console.log("saveAssociatedCategory()// Error while computing --> ", err);
            next(err);
          });
        }
      } catch (err) {
        var apiErr = new ApiError(req.id, "ValidationError", "Bad Request", err, 400);

        console.log("saveAssociatedCategory()//Error in validating schema ...", err);

        return next(apiErr);
      }
    }
  }, {
    key: "getDistinctCategories",
    value: function getDistinctCategories(categoryDocs) {
      var categorySet = new Set();

      categoryDocs.forEach(function (item) {
        return categorySet.add(item.category);
      });

      return categorySet;
    }
  }, {
    key: "checkDBExistingCategories",
    value: function checkDBExistingCategories(distinctCategoryIds) {
      var collection = "categories",
          query = {
        "body": {
          "_id": {
            "$in": distinctCategoryIds
          }
        },
        "fields": {
          "_id": 1
        }
      };

      return this._dbService.read({ collection: collection, query: query }).catch(function (error) {
        console.log("checkDBExistingCategories()//Error while getting categories from database.");
        throw error;
      });
    }
  }, {
    key: "saveDocuments",
    value: function saveDocuments(docsToSave) {
      var collection = "document_categories",
          documents = docsToSave;

      console.log("saveDocuments()//Documents going to save in collection: " + collection + " --> ", documents);

      return this._dbService.insert({ collection: collection, documents: documents });
    }
  }]);

  return Problem2Service;
}();

function getServiceInstance(dbService, genericValidatorIns) {
  protectedService = protectedService || new Problem2Service(dbService, genericValidatorIns);
  return protectedService;
}

module.exports = getServiceInstance;
//# sourceMappingURL=Problem2.js.map

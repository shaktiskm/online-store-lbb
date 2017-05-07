const documentSchema = require("../../schemas/document"),
  ApiError = require("../../util/apiError");

let protectedService;

class Problem2Service {

  constructor(dbService, genericValidatorIns) {
    this._dbService = dbService;
    this._genericValidator = genericValidatorIns;
  }

  saveAssociatedCategory(req, res, next) {
    let payload = req.body,
      isSchemaValidated = false,
      distinctCategoryIds,
      rejectedPayloadDocs = [];

    try {
      isSchemaValidated = this._genericValidator.schemaValidation(payload, documentSchema);

      if (isSchemaValidated) {
        console.log("saveAssociatedCategory()// Payload Validation Successful.");
        distinctCategoryIds = this.getDistinctCategories(payload);

        this.checkDBExistingCategories([...distinctCategoryIds])
          .then(categoryArr => {

            let finalDocToSave,
              categoryIds = categoryArr.map(catObj => catObj._id);

            finalDocToSave = payload.filter(item => {
              if (categoryIds.indexOf(item.category) !== -1) {
                return true;
              }
              rejectedPayloadDocs.push(item);
              return false;
            });

            return finalDocToSave;
          })
          .then(this.saveDocuments.bind(this))
          .then(success => {
            let response = {
              "status": "success",
              "rejectedDocuments": rejectedPayloadDocs
            };

            console.log("Documents saved successfully...", success.result);

            res.status(200).send(response);
          })
          .catch(err => {
            if (err.name === "MongoError") {
              let apiError = new ApiError(req.id, "DuplicateError", "Duplicate Document Error", "", 400);

              console.log("saveAssociatedCategory()// Going to create duplicate document in db --> ", err.message);
              return next(apiError);
            }
            console.log("saveAssociatedCategory()// Error while computing --> ", err);
            next(err);
          });
      }

    } catch (err) {
      let apiErr = new ApiError(req.id, "ValidationError", "Bad Request", err, 400);

      console.log("saveAssociatedCategory()//Error in validating schema ...", err);

      return next(apiErr);
    }
  }

  getDistinctCategories(categoryDocs) {
    let categorySet = new Set();

    categoryDocs.forEach(item => categorySet.add(item.category));

    return categorySet;
  }

  checkDBExistingCategories(distinctCategoryIds) {
    let collection = "categories",
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

    return this._dbService.read({collection, query})
      .catch(error => {
        console.log("checkDBExistingCategories()//Error while getting categories from database.");
        throw error;
      });
  }

  saveDocuments(docsToSave) {
    let collection = "document_categories",
      documents = docsToSave;

    console.log(`saveDocuments()//Documents going to save in collection: ${collection} --> `, documents);

    return this._dbService.insert({collection, documents});
  }

}

function getServiceInstance(dbService, genericValidatorIns) {
  protectedService = protectedService || new Problem2Service(dbService, genericValidatorIns);
  return protectedService;
}

module.exports = getServiceInstance;

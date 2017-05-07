"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiError = require("../../util/apiError");

var protectedService = void 0;

var ProductService = function () {
  function ProductService(dbService, uniqueIdService) {
    _classCallCheck(this, ProductService);

    this._dbService = dbService;
    ProductService.UniqueIdService = uniqueIdService;
    this.collection = "products";
  }

  _createClass(ProductService, [{
    key: "retrieveProducts",
    value: function retrieveProducts(req, res, next) {
      var collection = this.collection,
          query = {};

      this._dbService.read({ collection: collection, query: query }).then(function (result) {
        console.log("retrieveProducts()//Successfully retrieved products");
        var successResponse = {
          "reqId": req.id,
          "status": "success",
          "data": result
        };

        ProductService.successHandler(successResponse, req.Id, res, next);
      }).catch(function (err) {
        console.log("retrieveProducts()//Error in retrieving products", err);
        ProductService.errorHandler(err, req.id, next);
      });
    }
  }, {
    key: "createProduct",
    value: function createProduct(req, res, next) {
      var collection = this.collection,
          payload = req.body,
          uniqueId = ProductService.UniqueIdService.createUniqueId(),
          document = Object.assign(payload, { "_id": uniqueId });

      this._dbService.insertOne({ collection: collection, document: document }).then(function (success) {
        console.log("createProduct()//Successfully created product with dbResult", success.result);
        var successResponse = {
          "reqId": req.id,
          "id": uniqueId,
          "status": "success"
        };

        ProductService.successHandler(successResponse, req.Id, res, next);
      }).catch(function (err) {
        console.log("createProduct()//Error in creating product", err);
        ProductService.errorHandler(err, req.id, next);
      });
    }
  }, {
    key: "retrieveProductById",
    value: function retrieveProductById(req, res, next) {
      var collection = this.collection,
          productId = req.params.id,
          query = {
        "_id": productId
      };

      this._dbService.read({ collection: collection, query: query }).then(function (result) {
        console.log("retrieveProductById()//Successfully retrieved product with id " + productId);
        var successResponse = {
          "reqId": req.id,
          "status": "success",
          "data": result
        };

        ProductService.successHandler(successResponse, req.Id, res, next);
      }).catch(function (err) {
        console.log("retrieveProductById()//Error in retrieving product", err);
        ProductService.errorHandler(err, req.id, next);
      });
    }
  }, {
    key: "updateProductById",
    value: function updateProductById(req, res, next) {
      var collection = this.collection,
          productId = req.params.id,
          payload = req.body,
          query = {
        "_id": productId
      },
          document = {
        "$set": payload
      };

      this._dbService.update({ collection: collection, query: query, document: document }).then(function (result) {
        console.log("updateProductById()//Successfully updated product with id " + productId + " and dbResult modifiedCount", result.modifiedCount);
        var successResponse = {
          "reqId": req.id,
          "id": productId,
          "status": "success"
        };

        ProductService.successHandler(successResponse, req.Id, res, next);
      }).catch(function (err) {
        console.log("updateProductById()//Error in updating product", err);
        ProductService.errorHandler(err, req.id, next);
      });
    }
  }, {
    key: "deleteProductById",
    value: function deleteProductById(req, res, next) {
      var collection = this.collection,
          productId = req.params.id,
          document = {
        "_id": productId
      };

      this._dbService.remove({ collection: collection, document: document }).then(function (result) {
        console.log("deleteProductById()//Successfully removed product with id " + productId + " and dbResult deletedCount", result.deletedCount);
        var successResponse = {
          "reqId": req.id,
          "id": productId,
          "status": "success"
        };

        ProductService.successHandler(successResponse, req.Id, res, next);
      }).catch(function (err) {
        console.log("deleteProductById()//Error in removing product", err);
        ProductService.errorHandler(err, req.id, next);
      });
    }
  }, {
    key: "addOrRemoveProductQty",
    value: function addOrRemoveProductQty(req, res, next) {
      var collection = this.collection,
          productId = req.params.id,
          payload = req.body,
          query = {
        "_id": productId
      },
          document = {
        "$inc": {
          "qty": payload.qty
        }
      };

      this._dbService.update({ collection: collection, query: query, document: document }).then(function (result) {
        console.log("addOrRemoveProductQty()//Successfully updated product quantity with id " + productId, result.modifiedCount);
        var successResponse = {
          "reqId": req.id,
          "id": productId,
          "status": "success"
        };

        ProductService.successHandler(successResponse, req.Id, res, next);
      }).catch(function (err) {
        console.log("addOrRemoveProductQty()//Error in updating product quantity", err);
        ProductService.errorHandler(err, req.id, next);
      });
    }
  }], [{
    key: "successHandler",
    value: function successHandler(data, reqId, res, next) {
      if (!data || Object.keys(data).length === 0) {
        return next(new ApiError(reqId, "Not Found", "Resource does not exist", "", 404));
      }
      res.status(200).send(data);
    }
  }, {
    key: "errorHandler",
    value: function errorHandler(err, reqId, next) {
      var apiErr = new ApiError(reqId, "Error", "Internal Server Error", err, 500);

      next(apiErr);
    }
  }]);

  return ProductService;
}();

function getServiceInstance(dbService, uniqueIdService) {
  protectedService = protectedService || new ProductService(dbService, uniqueIdService);
  return protectedService;
}

module.exports = getServiceInstance;
//# sourceMappingURL=ProductService.js.map

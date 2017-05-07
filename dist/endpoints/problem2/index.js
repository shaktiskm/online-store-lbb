"use strict";

var express = require("express"),
    isMyJsonValid = require("is-my-json-valid"),
    getGenericRepoIns = require("../../mongodb/GenericRepository"),
    getGenericValidatorIns = require("../../mongodb/GenericValidator"),
    getServiceInstance = require("./Problem2");

var NODE_ENV = process.env.NODE_ENV,
    nodeEnv = NODE_ENV || "local",
    config = Object.freeze(require("../../../config/" + nodeEnv)),
    genericValidatorIns = new getGenericValidatorIns({ "schemaValidator": isMyJsonValid }),
    dbService = getGenericRepoIns(config),
    problemServiceIns = getServiceInstance(dbService, genericValidatorIns),
    router = express.Router(),
    rootRoute = router.route("/");


rootRoute.post(problemServiceIns.saveAssociatedCategory.bind(problemServiceIns));

module.exports = router;
//# sourceMappingURL=index.js.map

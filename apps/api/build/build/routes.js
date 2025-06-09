"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const reviewsController_1 = require("./../src/reviews/reviewsController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const productsController_1 = require("./../src/products/productsController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const generateController_1 = require("./../src/generate/generateController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "ReviewDto": {
        "dataType": "refObject",
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "text": { "dataType": "string", "required": true },
            "rating": { "dataType": "double", "required": true },
            "productId": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewListResponse": {
        "dataType": "refObject",
        "properties": {
            "reviews": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ReviewDto" }, "required": true },
            "totalPages": { "dataType": "double", "required": true },
            "currentPage": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Error": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "message": { "dataType": "string", "required": true },
            "stack": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewQueryParams": {
        "dataType": "refObject",
        "properties": {
            "page": { "dataType": "string" },
            "limit": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidateErrorJSON": {
        "dataType": "refObject",
        "properties": {
            "message": { "dataType": "enum", "enums": ["Validation failed"], "required": true },
            "details": { "dataType": "nestedObjectLiteral", "nestedProperties": {}, "additionalProperties": { "dataType": "any" }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewCreationParams": {
        "dataType": "refObject",
        "properties": {
            "text": { "dataType": "string", "required": true },
            "rating": { "dataType": "double", "required": true },
            "productId": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductDto": {
        "dataType": "refObject",
        "properties": {
            "_id": { "dataType": "string", "required": true },
            "category": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "price": { "dataType": "double", "required": true },
            "image": { "dataType": "string", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductListResponse": {
        "dataType": "refObject",
        "properties": {
            "products": { "dataType": "array", "array": { "dataType": "refObject", "ref": "ProductDto" }, "required": true },
            "totalPages": { "dataType": "double", "required": true },
            "currentPage": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductQueryParams": {
        "dataType": "refObject",
        "properties": {
            "page": { "dataType": "string" },
            "limit": { "dataType": "string" },
            "category": { "dataType": "string" },
            "price": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["highest"] }, { "dataType": "enum", "enums": ["lowest"] }] },
            "query": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProductCreationParams": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "category": { "dataType": "string", "required": true },
            "price": { "dataType": "double", "required": true },
            "image": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    const argsReviewsController_getProductReviews = {
        productId: { "in": "path", "name": "productId", "required": true, "dataType": "string" },
        queryParams: { "in": "queries", "name": "queryParams", "required": true, "ref": "ReviewQueryParams" },
    };
    app.get('/reviews/:productId', ...((0, runtime_1.fetchMiddlewares)(reviewsController_1.ReviewsController)), ...((0, runtime_1.fetchMiddlewares)(reviewsController_1.ReviewsController.prototype.getProductReviews)), function ReviewsController_getProductReviews(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReviewsController_getProductReviews, request, response });
                const controller = new reviewsController_1.ReviewsController();
                yield templateService.apiHandler({
                    methodName: 'getProductReviews',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsReviewsController_postProduct = {
        requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "ReviewCreationParams" },
    };
    app.post('/reviews', ...((0, runtime_1.fetchMiddlewares)(reviewsController_1.ReviewsController)), ...((0, runtime_1.fetchMiddlewares)(reviewsController_1.ReviewsController.prototype.postProduct)), function ReviewsController_postProduct(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReviewsController_postProduct, request, response });
                const controller = new reviewsController_1.ReviewsController();
                yield templateService.apiHandler({
                    methodName: 'postProduct',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 201,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsReviewsController_deleteProduct = {
        reviewId: { "in": "path", "name": "reviewId", "required": true, "dataType": "string" },
    };
    app.delete('/reviews/:reviewId', ...((0, runtime_1.fetchMiddlewares)(reviewsController_1.ReviewsController)), ...((0, runtime_1.fetchMiddlewares)(reviewsController_1.ReviewsController.prototype.deleteProduct)), function ReviewsController_deleteProduct(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsReviewsController_deleteProduct, request, response });
                const controller = new reviewsController_1.ReviewsController();
                yield templateService.apiHandler({
                    methodName: 'deleteProduct',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 204,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProductsController_getAllProducts = {
        queryParams: { "in": "queries", "name": "queryParams", "required": true, "ref": "ProductQueryParams" },
    };
    app.get('/products', ...((0, runtime_1.fetchMiddlewares)(productsController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(productsController_1.ProductsController.prototype.getAllProducts)), function ProductsController_getAllProducts(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductsController_getAllProducts, request, response });
                const controller = new productsController_1.ProductsController();
                yield templateService.apiHandler({
                    methodName: 'getAllProducts',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProductsController_getProductById = {
        productId: { "in": "path", "name": "productId", "required": true, "dataType": "string" },
    };
    app.get('/products/:productId', ...((0, runtime_1.fetchMiddlewares)(productsController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(productsController_1.ProductsController.prototype.getProductById)), function ProductsController_getProductById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductsController_getProductById, request, response });
                const controller = new productsController_1.ProductsController();
                yield templateService.apiHandler({
                    methodName: 'getProductById',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: undefined,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProductsController_postProduct = {
        requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "ProductCreationParams" },
    };
    app.post('/products', ...((0, runtime_1.fetchMiddlewares)(productsController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(productsController_1.ProductsController.prototype.postProduct)), function ProductsController_postProduct(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductsController_postProduct, request, response });
                const controller = new productsController_1.ProductsController();
                yield templateService.apiHandler({
                    methodName: 'postProduct',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 201,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsProductsController_deleteProduct = {
        productId: { "in": "path", "name": "productId", "required": true, "dataType": "string" },
    };
    app.delete('/products/:productId', ...((0, runtime_1.fetchMiddlewares)(productsController_1.ProductsController)), ...((0, runtime_1.fetchMiddlewares)(productsController_1.ProductsController.prototype.deleteProduct)), function ProductsController_deleteProduct(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsProductsController_deleteProduct, request, response });
                const controller = new productsController_1.ProductsController();
                yield templateService.apiHandler({
                    methodName: 'deleteProduct',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 204,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    const argsGenerateController_generateData = {};
    app.get('/generate', ...((0, runtime_1.fetchMiddlewares)(generateController_1.GenerateController)), ...((0, runtime_1.fetchMiddlewares)(generateController_1.GenerateController.prototype.generateData)), function GenerateController_generateData(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            let validatedArgs = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsGenerateController_generateData, request, response });
                const controller = new generateController_1.GenerateController();
                yield templateService.apiHandler({
                    methodName: 'generateData',
                    controller,
                    response,
                    next,
                    validatedArgs,
                    successStatus: 201,
                });
            }
            catch (err) {
                return next(err);
            }
        });
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

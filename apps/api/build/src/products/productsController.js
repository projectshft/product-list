"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ProductsController = void 0;
const tsoa_1 = require("tsoa");
const productsService_1 = require("./productsService");
let ProductsController = class ProductsController extends tsoa_1.Controller {
    /**
     * Retrieves a an array of products. Requires URL query params page and limit.
     * Optional URL query params page and limit.
     * If no page or limit given, only first 10 results returned.
     * @example "http://localhost:3000/products?page=1&limit=5"
     */
    getAllProducts(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return new productsService_1.ProductsService().getAllProducts(queryParams);
        });
    }
    /**
     * Retrieves a single product using product Id in URL path.
     * @param {string} productId The unique product id.
     */
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new productsService_1.ProductsService().getProductById(productId);
        });
    }
    /**
     * Creates a product. Pass product information using request body.
     * @example {
     * "name": "Scissors",
     * "category": "tools",
     * "price": 5.50,
     * "image": "https://via.placeholder.com/250?text=Product+Image"
     * }
     */
    postProduct(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setStatus(201);
            new productsService_1.ProductsService().createProduct(requestBody);
            return;
        });
    }
    /**
     * Deletes a single product using product Id in URL path.
     * @param {string} productId The unique product id.
     */
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setStatus(204);
            new productsService_1.ProductsService().deleteProduct(productId);
            return;
            // TODO: TomW return for product not found
        });
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Queries)())
], ProductsController.prototype, "getAllProducts", null);
__decorate([
    (0, tsoa_1.Get)('{productId}'),
    __param(0, (0, tsoa_1.Path)())
], ProductsController.prototype, "getProductById", null);
__decorate([
    (0, tsoa_1.Response)(422, 'Validation Failed'),
    (0, tsoa_1.SuccessResponse)('201', 'Created'),
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)())
], ProductsController.prototype, "postProduct", null);
__decorate([
    (0, tsoa_1.SuccessResponse)('204', 'No Content'),
    (0, tsoa_1.Delete)('{productId}'),
    __param(0, (0, tsoa_1.Path)())
], ProductsController.prototype, "deleteProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, tsoa_1.Route)('products')
], ProductsController);

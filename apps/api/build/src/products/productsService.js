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
exports.ProductsService = void 0;
const productModel_1 = require("./productModel");
const productHelpers_1 = require("./productHelpers");
const mongoose_1 = require("mongoose");
class ProductsService {
    getAllProducts(_a) {
        return __awaiter(this, arguments, void 0, function* ({ page, limit, category, price, query, }) {
            try {
                const pageAsInt = parseInt(typeof page === 'string' ? page : '1');
                const limitAsInt = parseInt(typeof limit === 'string' ? limit : '10');
                const productDocuments = yield productModel_1.Product.find((0, productHelpers_1.returnFindOptions)(category, query))
                    .skip(limitAsInt * (pageAsInt - 1))
                    .limit(limitAsInt)
                    .sort((0, productHelpers_1.returnSortOptions)(price));
                const count = yield productModel_1.Product.countDocuments((0, productHelpers_1.returnFindOptions)(category, query));
                const productsDto = productDocuments.map((product) => {
                    return (0, productHelpers_1.convertDocumentToProductDto)(product);
                });
                return {
                    products: productsDto,
                    totalPages: Math.ceil(count / limitAsInt),
                    currentPage: pageAsInt,
                };
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`[getAllProducts] ${error.message}`);
                }
                throw new Error('[getAllProducts] unknown error');
            }
        });
    }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productDocument = yield productModel_1.Product.findById(productId);
                if (!productDocument)
                    throw new Error('[getProductById] product not found');
                return (0, productHelpers_1.convertDocumentToProductDto)(productDocument);
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`[getProductById] ${error.message}`);
                }
                if (typeof error === 'string')
                    throw new Error(error);
                throw new Error('[getProductById] unknown error');
            }
        });
    }
    createProduct(productToCreate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productDocument = yield productModel_1.Product.create(productToCreate);
                if (!productDocument)
                    throw new Error('[createProduct] create product failed');
                return (0, productHelpers_1.convertDocumentToProductDto)(productDocument);
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`[createProduct] ${error.message}`);
                }
                if (typeof error === 'string')
                    throw new Error(error);
                throw new Error('[createProduct] unknown error');
            }
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productDocument = yield productModel_1.Product.findByIdAndDelete(productId);
                if (!productDocument)
                    throw new Error('[deleteProduct] delete product failed');
                return (0, productHelpers_1.convertDocumentToProductDto)(productDocument);
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`[deleteProduct] ${error.message}`);
                }
                if (typeof error === 'string')
                    throw new Error(error);
                throw new Error('[deleteProduct] unknown error');
            }
        });
    }
}
exports.ProductsService = ProductsService;

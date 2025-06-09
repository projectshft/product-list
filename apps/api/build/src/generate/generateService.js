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
exports.GenerateService = void 0;
const reviewModel_1 = require("../reviews/reviewModel");
const productModel_1 = require("../products/productModel");
const generateHelpers_1 = require("./generateHelpers");
const mongoose_1 = require("mongoose");
const PRODUCTS = 90;
const REVIEWS = 5;
class GenerateService {
    generateData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (let i = 0; i < PRODUCTS; i++) {
                    //Build product and add to database
                    const productDocument = yield productModel_1.Product.create((0, generateHelpers_1.buildProduct)());
                    console.log(`Created ${productDocument.name}`);
                    for (let i = 0; i < REVIEWS; i++) {
                        //Build review with productDocument._id
                        const reviewDocument = yield reviewModel_1.Review.create(Object.assign(Object.assign({}, (0, generateHelpers_1.buildReview)()), { productId: productDocument._id }));
                        console.log(`Added review ${reviewDocument._id}`);
                    }
                }
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`[generateData] ${error.message}`);
                }
                throw new Error('[generateData] unknown error');
            }
        });
    }
}
exports.GenerateService = GenerateService;

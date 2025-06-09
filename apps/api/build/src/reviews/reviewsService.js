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
exports.ReviewsService = void 0;
const mongoose_1 = require("mongoose");
const productModel_1 = require("../products/productModel");
const reviewHelpers_1 = require("./reviewHelpers");
const reviewModel_1 = require("./reviewModel");
class ReviewsService {
    getProductReviews(productId_1, _a) {
        return __awaiter(this, arguments, void 0, function* (productId, { page, limit }) {
            try {
                const pageAsInt = parseInt(typeof page === 'string' ? page : '1');
                const limitAsInt = parseInt(typeof limit === 'string' ? limit : '10');
                const productDocument = yield productModel_1.Product.findById(productId);
                if (!productDocument)
                    throw new Error();
                const reviewDocuments = yield reviewModel_1.Review.find({ productId })
                    .skip(limitAsInt * (pageAsInt - 1))
                    .limit(limitAsInt)
                    .sort({ createdAt: -1 });
                const count = yield reviewModel_1.Review.countDocuments({ productId });
                const reviewsDto = reviewDocuments.map((review) => {
                    return (0, reviewHelpers_1.convertDocumentToReviewDto)(review);
                });
                return {
                    reviews: reviewsDto,
                    totalPages: Math.ceil(count / limitAsInt),
                    currentPage: pageAsInt,
                };
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`[getProductReviews] ${error.message}`);
                }
                throw new Error('[getProductReviews] unknown error');
            }
        });
    }
    createReview(reviewToCreate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productDocument = yield productModel_1.Product.findById(reviewToCreate.productId);
                if (!productDocument)
                    throw new Error('[createReview] create review failed');
                const reviewDocument = yield reviewModel_1.Review.create(reviewToCreate);
                return (0, reviewHelpers_1.convertDocumentToReviewDto)(reviewDocument);
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`[createReview] ${error.message}`);
                }
                if (typeof error === 'string')
                    throw new Error(error);
                throw new Error('[createReview] unknown error');
            }
        });
    }
    deleteReview(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewDocument = yield reviewModel_1.Review.findByIdAndDelete(reviewId);
                if (!reviewDocument)
                    throw new Error('[deleteReview] delete review failed');
                return (0, reviewHelpers_1.convertDocumentToReviewDto)(reviewDocument);
            }
            catch (error) {
                if (error instanceof mongoose_1.MongooseError) {
                    throw new Error(`[deleteReview] ${error.message}`);
                }
                if (typeof error === 'string')
                    throw new Error(error);
                throw new Error('[deleteReview] unknown error');
            }
        });
    }
}
exports.ReviewsService = ReviewsService;

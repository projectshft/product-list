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
exports.ReviewsController = void 0;
const tsoa_1 = require("tsoa");
const reviewsService_1 = require("./reviewsService");
let ReviewsController = class ReviewsController extends tsoa_1.Controller {
    /**
     * Retrieves a an array of reviews for a specific product Id.
     * Optional URL query params page and limit.
     * If no page or limit given, only first 10 results returned.
     * @example "http://localhost:3000/reviews/6839f26a130912d633d748c5?page=1&limit=5"
     */
    getProductReviews(productId, queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return new reviewsService_1.ReviewsService().getProductReviews(productId, queryParams);
        });
    }
    /**
     * Creates a review. Pass review information using request body.
     * @example {
     * "text": "Colligo angustus delectatio ademptio cupio celer volubilis.",
     * "rating": "5",
     * "productId": "",
     * }
     */
    postProduct(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setStatus(201);
            new reviewsService_1.ReviewsService().createReview(requestBody);
            return;
        });
    }
    /**
     * Deletes a single review using review Id in URL path.
     * @param {string} reviewId The unique review id.
     */
    deleteProduct(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setStatus(204);
            new reviewsService_1.ReviewsService().deleteReview(reviewId);
            return;
        });
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, tsoa_1.Get)('{productId}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Queries)())
], ReviewsController.prototype, "getProductReviews", null);
__decorate([
    (0, tsoa_1.Response)(422, 'Validation Failed'),
    (0, tsoa_1.SuccessResponse)('201', 'Created'),
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)())
], ReviewsController.prototype, "postProduct", null);
__decorate([
    (0, tsoa_1.SuccessResponse)('204', 'No Content'),
    (0, tsoa_1.Delete)('{reviewId}'),
    __param(0, (0, tsoa_1.Path)())
], ReviewsController.prototype, "deleteProduct", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, tsoa_1.Route)('reviews')
], ReviewsController);

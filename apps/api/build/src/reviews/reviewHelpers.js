"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDocumentToReviewDto = void 0;
const convertDocumentToReviewDto = (document) => {
    const dto = document.toObject();
    return Object.assign(Object.assign({}, dto), { _id: dto._id.toString(), productId: dto.productId.toString() });
};
exports.convertDocumentToReviewDto = convertDocumentToReviewDto;

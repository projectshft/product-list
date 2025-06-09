"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnFindOptions = exports.returnSortOptions = exports.convertDocumentToProductDto = void 0;
const convertDocumentToProductDto = (document) => {
    const dto = document.toObject();
    return Object.assign(Object.assign({}, dto), { _id: dto._id.toString() });
};
exports.convertDocumentToProductDto = convertDocumentToProductDto;
/**
 * Build sort options. Returns object conditional on the value of price param.
 * @param {'highest' | 'lowest' | undefined} price - Optional.
 * @returns {Record<string, SortOrder>} Returns a record used by Mongoose to sort search results.
 */
const returnSortOptions = (price) => {
    if (price === 'highest')
        return { price: -1, createdAt: -1 };
    else if (price === 'lowest')
        return { price: 1, createdAt: -1 };
    else
        return { createdAt: -1 };
};
exports.returnSortOptions = returnSortOptions;
/**
 * Format the find options for a product.
 * Builds category and find objects.
 * Returns object conditional on category or query being defined.
 * @param {string | undefined} category - Optional product category.
 * @param {string | undefined} query - Optional search query.
 * @returns {FilterQuery<ProductType>} Returns a Mongoose query for Product model.
 */
const returnFindOptions = (category, query) => {
    const categoryFindObject = {
        category: { $regex: category, $options: 'i' },
    };
    const queryFindObject = { name: { $regex: query, $options: 'i' } };
    if (category && query)
        return Object.assign(Object.assign({}, categoryFindObject), queryFindObject);
    if (query)
        return queryFindObject;
    if (category)
        return categoryFindObject;
    return {};
};
exports.returnFindOptions = returnFindOptions;

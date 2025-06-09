"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildReview = exports.buildProduct = void 0;
const faker_1 = require("@faker-js/faker");
const buildProduct = () => {
    return {
        category: faker_1.faker.commerce.department(),
        name: faker_1.faker.commerce.productName(),
        price: faker_1.faker.commerce.price(),
        image: faker_1.faker.image.urlPicsumPhotos({ width: 320, height: 320 }),
    };
};
exports.buildProduct = buildProduct;
const buildReview = () => {
    return {
        text: faker_1.faker.lorem.paragraph(),
        rating: faker_1.faker.number.int({ min: 1, max: 5 }),
    };
};
exports.buildReview = buildReview;

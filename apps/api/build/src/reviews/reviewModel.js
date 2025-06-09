"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
//This is the Product Schema
const ReviewSchema = new Schema({
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
}, { timestamps: true });
exports.Review = model('Review', ReviewSchema);

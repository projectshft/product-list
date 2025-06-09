"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const tsoa_1 = require("tsoa");
const errorHandler = (err, req, res, next) => {
    if (err instanceof tsoa_1.ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        res.status(422).json({
            message: 'Validation Failed',
            details: err === null || err === void 0 ? void 0 : err.fields,
        });
    }
    if (err instanceof Error) {
        console.warn(`Caught Error:`, err.message);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
    next();
};
exports.errorHandler = errorHandler;
const notFoundHandler = (_req, res) => {
    res.status(404).send({
        message: 'Not Found',
    });
};
exports.notFoundHandler = notFoundHandler;

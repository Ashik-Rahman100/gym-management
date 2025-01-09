"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
// import { IGenericErrorMessage } from '../../interfaces/error';
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (error, req, res, next) => {
    config_1.default.node_env === 'development'
        ? console.log(` globalErrorHandler ~~`, { error })
        : console.error(` globalErrorHandler ~~`, error);
    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorDetails = [];
    if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorDetails = simplifiedError.errorDetails;
    }
    else if (error instanceof ApiError_1.default) {
        // console.log('Path ++', error);
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorDetails = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    field: error.name,
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        // console.log('Path++', error);
        message = error === null || error === void 0 ? void 0 : error.message;
        errorDetails = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    field: error.name,
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorDetails,
        stack: config_1.default.node_env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.default = globalErrorHandler;

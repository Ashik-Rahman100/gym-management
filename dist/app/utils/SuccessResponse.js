"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SuccessResponse = (res, data) => {
    return res.status(data.status).json({
        success: data.success,
        status: data.status,
        message: data.message,
        data: data.data,
    });
};
exports.default = SuccessResponse;

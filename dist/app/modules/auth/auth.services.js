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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AccessToken_1 = require("../../helpers/AccessToken");
const compare_password_1 = require("../../helpers/compare-password");
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const AppError_1 = require("../../utils/AppError");
const userLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (!isExistUser) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    const isMatchedPassword = yield (0, compare_password_1.ComparePassword)(payload.password, isExistUser.password);
    if (!isMatchedPassword) {
        throw new AppError_1.AppError(http_status_1.default.UNAUTHORIZED, ' Invalid credentials');
    }
    const accessTokenData = {
        email: isExistUser.email,
        name: isExistUser.fullName,
        role: isExistUser.role,
        id: isExistUser.id,
    };
    const accessToken = yield (0, AccessToken_1.getAccessToken)(accessTokenData, config_1.default.access_token, config_1.default.access_in);
    const refreshToken = yield (0, AccessToken_1.getAccessToken)(accessTokenData, config_1.default.refresh_token, config_1.default.refresh_in);
    return {
        // email: isExistUser.email,
        // name: isExistUser.fullName,
        // role: isExistUser.role,
        // id: isExistUser.id,
        accessToken,
        refreshToken,
    };
});
exports.authServices = { userLogin };

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
exports.userServices = void 0;
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const AppError_1 = require("../../utils/AppError");
const http_status_1 = __importDefault(require("http-status"));
const hash_password_1 = require("../../helpers/hash-password");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.fullName = `${payload.firstName} ${payload.lastName}`;
    const hashPassword = yield (0, hash_password_1.HashPassword)(payload.password);
    payload.password = hashPassword;
    payload.role = 'TRAINEE';
    const data = yield prisma_1.default.user.create({
        data: payload,
    });
    return data;
});
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.fullName = `${payload.firstName} ${payload.lastName}`;
    const hashPassword = yield (0, hash_password_1.HashPassword)(payload.password);
    payload.password = hashPassword;
    payload.role = 'ADMIN';
    const data = yield prisma_1.default.user.create({
        data: payload,
    });
    return data;
});
const createTrainer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.fullName = `${payload.firstName} ${payload.lastName}`;
    const hashPassword = yield (0, hash_password_1.HashPassword)(payload.password);
    payload.password = hashPassword;
    payload.role = 'TRAINER';
    const data = yield prisma_1.default.user.create({
        data: payload,
    });
    return data;
});
const retrieveAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.user.findMany({});
    return data;
});
const retrieveMyProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.user.findFirst({
        where: {
            id: id,
        },
    });
    if (!data) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    return data;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield prisma_1.default.user.findUnique({
        where: { id },
    });
    if (!isExistUser) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    const data = yield prisma_1.default.user.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return data;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.user.delete({
        where: { id },
    });
    if (!data) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'User delete failed!');
    }
    return data;
});
exports.userServices = {
    createUser,
    retrieveAllUsers,
    updateUser,
    deleteUser,
    retrieveMyProfile,
    createAdmin,
    createTrainer,
};

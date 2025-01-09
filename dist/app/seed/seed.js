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
exports.seedAdmin = void 0;
const hash_password_1 = require("../helpers/hash-password");
const prisma_1 = __importDefault(require("../helpers/prisma"));
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    // Check if a SUPER_ADMIN already exists
    const isExistSuperAdmin = yield prisma_1.default.user.findFirst({
        where: {
            email: 'admin@gmail.com',
        },
    });
    // If no SUPER_ADMIN exists, create one
    if (!isExistSuperAdmin) {
        const hashPassword = yield (0, hash_password_1.HashPassword)('admin123@');
        const userData = yield prisma_1.default.user.create({
            data: {
                firstName: 'Mr.',
                lastName: 'Admin',
                fullName: 'Mr. Admin',
                email: 'admin@gmail.com',
                role: 'ADMIN',
                password: hashPassword,
                profileImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            },
        });
        console.log('Super Admin already exists.');
        return userData;
    }
});
exports.seedAdmin = seedAdmin;

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
exports.classScheduleServices = void 0;
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const AppError_1 = require("../../utils/AppError");
const http_status_1 = __importDefault(require("http-status"));
const createClassSchedule = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, startTime, endTime } = payload;
    // 1. Check if already scheduled 5 classes on the given day
    const existingSchedules = yield prisma_1.default.classSchedule.findMany({
        where: { date },
    });
    if (existingSchedules.length >= 5) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Class scheduling limit exceeded. Only 5 classes are allowed per day.');
    }
    // 2. Check for time overlap
    const isOverlapping = existingSchedules.some(schedule => {
        const existingStartTime = new Date(schedule.startTime);
        const existingEndTime = new Date(schedule.endTime);
        const newStartTime = new Date(startTime);
        const newEndTime = new Date(endTime);
        return newStartTime < existingEndTime && newEndTime > existingStartTime;
    });
    if (isOverlapping) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Class time overlaps with an existing schedule.');
    }
    // 3. Create a class schedule.
    const data = yield prisma_1.default.classSchedule.create({
        data: payload,
    });
    return data;
});
const retrieveAllClassSchedule = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.classSchedule.findMany({
        include: {
            trainer: true,
        },
    });
    return data;
});
const retrieveSingleClassSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.classSchedule.findUnique({
        where: {
            id: id,
        },
        include: {
            trainer: true,
        },
    });
    if (!data) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'classSchedule not found!');
    }
    return data;
});
const updateClassSchedule = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistClassSchedule = yield prisma_1.default.classSchedule.findUnique({
        where: { id },
    });
    if (!isExistClassSchedule) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'classSchedule not found!');
    }
    const data = yield prisma_1.default.classSchedule.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return data;
});
const deleteClassSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.classSchedule.delete({
        where: { id },
    });
    if (!data) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'classSchedule delete failed!');
    }
    return data;
});
exports.classScheduleServices = {
    createClassSchedule,
    retrieveAllClassSchedule,
    updateClassSchedule,
    deleteClassSchedule,
    retrieveSingleClassSchedule,
};

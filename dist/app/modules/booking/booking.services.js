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
exports.bookingServices = void 0;
const prisma_1 = __importDefault(require("../../helpers/prisma"));
const AppError_1 = require("../../utils/AppError");
const http_status_1 = __importDefault(require("http-status"));
const createBookingSchedule = (traineeId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.traineeId = traineeId;
    // 1. Check is class schedule exit?
    const schedule = yield prisma_1.default.classSchedule.findUnique({
        where: {
            id: payload.scheduleId,
        },
    });
    if (!schedule) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'Class schedule not found.');
    }
    // 2. Check if the trainee already booked!
    const isAlreadyBooked = yield prisma_1.default.bookingClass.findFirst({
        where: {
            scheduleId: payload.scheduleId,
            traineeId: payload.traineeId,
        },
    });
    if (isAlreadyBooked) {
        throw new AppError_1.AppError(http_status_1.default.ALREADY_REPORTED, "You're already booked this class schedule!");
    }
    // 3. Check is the class schedule already booked 10 trainee.
    const isExistBookingSchedule = yield prisma_1.default.bookingClass.findMany({
        where: {
            scheduleId: payload.scheduleId,
        },
    });
    if (isExistBookingSchedule.length >= 10) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'Class schedule is full. Maximum 10 trainees allowed per schedule.');
    }
    // 4. Check if the trainee has already booked a class in the same time slot
    const overlappingBooking = yield prisma_1.default.bookingClass.findMany({
        where: {
            traineeId: payload.traineeId,
        },
        include: {
            schedules: true,
        },
    });
    if (overlappingBooking.length > 0) {
        const isOverlapped = overlappingBooking.some(existingBookings => {
            const bookedStartTime = new Date(existingBookings.schedules.startTime);
            const bookedEndTime = new Date(existingBookings.schedules.endTime);
            const newBookingStartTime = new Date(schedule.startTime);
            const newBookingEndTime = new Date(schedule.endTime);
            return (newBookingStartTime < bookedEndTime &&
                newBookingEndTime > bookedStartTime);
        });
        if (isOverlapped) {
            throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'You have already booked another class in the same time slot.');
        }
    }
    const data = yield prisma_1.default.bookingClass.create({
        data: payload,
    });
    return data;
});
const retrieveMyAllBookingSchedule = (traineeId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.bookingClass.findMany({
        where: { traineeId },
        include: {
            schedules: {
                include: {
                    trainer: true,
                },
            },
        },
    });
    return data;
});
const retrieveSingleBookingSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.bookingClass.findUnique({
        where: {
            id: id,
        },
    });
    if (!data) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'booking not found!');
    }
    return data;
});
const updateBookingSchedule = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistBookingSchedule = yield prisma_1.default.bookingClass.findUnique({
        where: { id },
    });
    if (!isExistBookingSchedule) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'booking not found!');
    }
    const data = yield prisma_1.default.bookingClass.update({
        where: {
            id: id,
        },
        data: payload,
    });
    return data;
});
const updateBookingScheduleStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistBookingSchedule = yield prisma_1.default.bookingClass.findUnique({
        where: { id },
    });
    if (!isExistBookingSchedule) {
        throw new AppError_1.AppError(http_status_1.default.NOT_FOUND, 'booking not found!');
    }
    const data = yield prisma_1.default.bookingClass.update({
        where: {
            id: id,
        },
        data: {
            status: payload.status,
        },
    });
    return data;
});
const deleteBookingSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.bookingClass.delete({
        where: { id },
    });
    if (!data) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, 'booking delete failed!');
    }
    return data;
});
exports.bookingServices = {
    createBookingSchedule,
    retrieveMyAllBookingSchedule,
    updateBookingSchedule,
    deleteBookingSchedule,
    retrieveSingleBookingSchedule,
    updateBookingScheduleStatus,
};

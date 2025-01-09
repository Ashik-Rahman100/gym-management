"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingScheduleValidation = exports.updateBookingClassSchema = exports.createBookingClassSchema = void 0;
const zod_1 = require("zod");
// Create BookingClass Schema
exports.createBookingClassSchema = zod_1.z.object({
    scheduleId: zod_1.z.string().uuid({ message: 'Schedule ID must be a valid UUID' }),
});
// Update BookingClass Schema
exports.updateBookingClassSchema = zod_1.z.object({
    scheduleId: zod_1.z
        .string()
        .uuid({ message: 'Schedule ID must be a valid UUID' })
        .optional(),
});
exports.bookingScheduleValidation = {
    createBookingClassSchema: exports.createBookingClassSchema,
    updateBookingClassSchema: exports.updateBookingClassSchema,
};

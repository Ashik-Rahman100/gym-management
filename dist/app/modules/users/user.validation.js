"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = exports.updateUserValidation = exports.createUserValidation = void 0;
const zod_1 = require("zod");
// Create User Schema
exports.createUserValidation = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
    fullName: zod_1.z.string().optional(),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    profileImage: zod_1.z.string().url('Invalid URL').optional(),
    phone: zod_1.z.string().optional(),
    //   schedules: z.array(z.any()).optional(), // Adjust based on `ClassSchedule` structure
    //   bookingClass: z.array(z.any()).optional(), // Adjust based on `BookingClass` structure
});
// Update User Schema
exports.updateUserValidation = zod_1.z.object({
    firstName: zod_1.z.string().min(1).optional(),
    lastName: zod_1.z.string().min(1).optional(),
    fullName: zod_1.z.string().optional(),
    email: zod_1.z.string().email('Invalid email address').optional(),
    password: zod_1.z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .optional(),
    profileImage: zod_1.z.string().url('Invalid URL').optional(),
    phone: zod_1.z.string().optional(),
    //   schedules: z.array(z.any()).optional(), // Adjust based on `ClassSchedule` structure
    //   bookingClass: z.array(z.any()).optional(), // Adjust based on `BookingClass` structure
});
exports.userValidation = { createUserValidation: exports.createUserValidation, updateUserValidation: exports.updateUserValidation };

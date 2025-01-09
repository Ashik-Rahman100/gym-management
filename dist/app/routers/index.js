"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const booking_route_1 = require("../modules/booking/booking.route");
const schedule_route_1 = require("../modules/schedule/schedule.route");
const user_route_1 = require("../modules/users/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        router: user_route_1.userRoute,
    },
    {
        path: '/class-schedule',
        router: schedule_route_1.classScheduleRoute,
    },
    {
        path: '/booking-schedule',
        router: booking_route_1.bookingScheduleRoute,
    },
    {
        path: '/auth',
        router: auth_route_1.authRoute,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.router));
exports.default = router;

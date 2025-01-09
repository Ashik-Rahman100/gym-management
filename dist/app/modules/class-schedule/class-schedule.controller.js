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
exports.classScheduleController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const SuccessResponse_1 = __importDefault(require("../../utils/SuccessResponse"));
const class_schedule_services_1 = require("./class-schedule.services");
const createClassSchedule = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield class_schedule_services_1.classScheduleServices.createClassSchedule(req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.CREATED,
        success: true,
        message: 'Schedule created successfully',
        data,
    });
}));
const retrieveAllClassSchedule = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield class_schedule_services_1.classScheduleServices.retrieveAllClassSchedule();
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve all class schedules successfully!',
        data,
    });
}));
const retrieveSingleClassSchedule = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield class_schedule_services_1.classScheduleServices.retrieveSingleClassSchedule(id);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Retrieve class schedule successfully!',
        data,
    });
}));
const updateClassSchedule = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield class_schedule_services_1.classScheduleServices.updateClassSchedule(id, req.body);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Update class schedule successfully!',
        data,
    });
}));
const deleteClassSchedule = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield class_schedule_services_1.classScheduleServices.deleteClassSchedule(id);
    (0, SuccessResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: 'Delete class schedule successfully!',
        data,
    });
}));
exports.classScheduleController = {
    createClassSchedule,
    retrieveAllClassSchedule,
    updateClassSchedule,
    retrieveSingleClassSchedule,
    deleteClassSchedule,
};

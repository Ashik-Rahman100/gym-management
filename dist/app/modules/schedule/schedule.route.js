"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classScheduleRoute = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("../../middlewares/Auth"));
const ValidationRequest_1 = __importDefault(require("../../utils/ValidationRequest"));
const schedule_controller_1 = require("./schedule.controller");
const schedule_validation_1 = require("./schedule.validation");
const router = express_1.default.Router();
router.post('/', (0, Auth_1.default)(client_1.Role.ADMIN), (0, ValidationRequest_1.default)(schedule_validation_1.classScheduleValidation.createClassScheduleSchema), schedule_controller_1.classScheduleController.createClassSchedule);
router.get('/', schedule_controller_1.classScheduleController.retrieveAllClassSchedule);
router.get('/:id', schedule_controller_1.classScheduleController.retrieveSingleClassSchedule);
router.patch('/:id', (0, Auth_1.default)(client_1.Role.ADMIN), (0, ValidationRequest_1.default)(schedule_validation_1.classScheduleValidation.updateClassScheduleSchema), schedule_controller_1.classScheduleController.updateClassSchedule);
router.delete('/:id', schedule_controller_1.classScheduleController.deleteClassSchedule);
exports.classScheduleRoute = router;

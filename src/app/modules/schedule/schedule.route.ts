import { Role } from '@prisma/client'
import express from 'express'
import Auth from '../../middlewares/Auth'
import ValidationRequest from '../../utils/ValidationRequest'
import { classScheduleController } from './schedule.controller'
import { classScheduleValidation } from './schedule.validation'
const router = express.Router()

router.post(
  '/',
  Auth(Role.ADMIN),
  ValidationRequest(classScheduleValidation.createClassScheduleSchema),
  classScheduleController.createClassSchedule,
)
router.get('/', classScheduleController.retrieveAllClassSchedule)
router.get('/:id', classScheduleController.retrieveSingleClassSchedule)
router.patch(
  '/:id',
  Auth(Role.ADMIN),
  ValidationRequest(classScheduleValidation.updateClassScheduleSchema),
  classScheduleController.updateClassSchedule,
)
router.delete('/:id', classScheduleController.deleteClassSchedule)

export const classScheduleRoute = router

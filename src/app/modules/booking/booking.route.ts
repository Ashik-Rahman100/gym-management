import express from 'express'
import { bookingController } from './booking.controller'
import ValidationRequest from '../../utils/ValidationRequest'
import { bookingScheduleValidation } from './booking.validation'
import Auth from '../../middlewares/Auth'
import { Role } from '@prisma/client'

const router = express.Router()

router.post(
  '/',
  Auth(Role.TRAINEE),
  ValidationRequest(bookingScheduleValidation.createBookingClassSchema),
  bookingController.createBookingSchedule,
)
router.get(
  '/my-booking-schedules',
  Auth(Role.TRAINEE),
  bookingController.retrieveMyAllBookingSchedule,
)
router.get(
  '/:id',
  Auth(Role.ADMIN, Role.TRAINEE, Role.TRAINER),
  bookingController.retrieveSingleBookingSchedule,
)
router.patch(
  '/:id',
  Auth(Role.ADMIN, Role.TRAINEE, Role.TRAINER),
  ValidationRequest(bookingScheduleValidation.updateBookingClassSchema),
  bookingController.updateBookingSchedule,
)
router.patch(
  '/update-status/:id',
  Auth(Role.TRAINEE),
  bookingController.updateBookingScheduleStatus,
)
router.delete(
  '/:id',
  Auth(Role.ADMIN, Role.TRAINEE, Role.TRAINER),
  bookingController.deleteBookingSchedule,
)

export const bookingScheduleRoute = router

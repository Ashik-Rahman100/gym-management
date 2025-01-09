import express from 'express'
import { authRoute } from '../modules/auth/auth.route'
import { bookingScheduleRoute } from '../modules/booking/booking.route'
import { classScheduleRoute } from '../modules/schedule/schedule.route'
import { userRoute } from '../modules/users/user.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    router: userRoute,
  },
  {
    path: '/class-schedule',
    router: classScheduleRoute,
  },
  {
    path: '/booking-schedule',
    router: bookingScheduleRoute,
  },
  {
    path: '/auth',
    router: authRoute,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.router))

export default router

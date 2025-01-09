import { Request, Response } from 'express'
import httpStatus from 'http-status'

import sendResponse from '../../utils/sendResponse'
import CatchAsync from '../auth/CatchAsync'
import { bookingServices } from './booking.services'

const createBookingSchedule = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req?.user
    const data = await bookingServices.createBookingSchedule(id, req.body)

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Class booked successfully!',
      data,
    })
  },
)
const retrieveMyAllBookingSchedule = CatchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req?.user
    const data = await bookingServices.retrieveMyAllBookingSchedule(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Retrieved my booked schedules successfully!',
      data,
    })
  },
)
const retrieveSingleBookingSchedule = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await bookingServices.retrieveSingleBookingSchedule(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved booked schedule successfully!',
    data,
  })
})
const updateBookingSchedule = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await bookingServices.updateBookingSchedule(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated booked schedule successfully!',
    data,
  })
})
const updateBookingScheduleStatus = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await bookingServices.updateBookingSchedule(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated booked schedule status successfully!',
    data,
  })
})
const deleteBookingSchedule = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await bookingServices.deleteBookingSchedule(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted booked schedule successfully!',
    data,
  })
})

export const bookingController = {
  createBookingSchedule,
  retrieveMyAllBookingSchedule,
  updateBookingSchedule,
  retrieveSingleBookingSchedule,
  deleteBookingSchedule,
  updateBookingScheduleStatus,
}

import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { bookingServices } from './booking.services'

const createBookingSchedule = catchAsync(
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
const retrieveMyAllBookingSchedule = catchAsync(
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
const retrieveSingleBookingSchedule = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = await bookingServices.retrieveSingleBookingSchedule(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved booked schedule successfully!',
    data,
  })
})
const updateBookingSchedule = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = await bookingServices.updateBookingSchedule(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated booked schedule successfully!',
    data,
  })
})
const updateBookingScheduleStatus = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = await bookingServices.updateBookingSchedule(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated booked schedule status successfully!',
    data,
  })
})
const deleteBookingSchedule = catchAsync(async (req, res) => {
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

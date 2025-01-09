import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import CatchAsync from '../auth/CatchAsync'
import { classScheduleServices } from './schedule.services'

const createClassSchedule = CatchAsync(async (req, res) => {
  const data = await classScheduleServices.createClassSchedule(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Schedule created successfully',
    data,
  })
})
const retrieveAllClassSchedule = CatchAsync(async (req, res) => {
  const data = await classScheduleServices.retrieveAllClassSchedule()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve all class schedules successfully!',
    data,
  })
})
const retrieveSingleClassSchedule = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await classScheduleServices.retrieveSingleClassSchedule(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve class schedule successfully!',
    data,
  })
})
const updateClassSchedule = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await classScheduleServices.updateClassSchedule(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update class schedule successfully!',
    data,
  })
})
const deleteClassSchedule = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await classScheduleServices.deleteClassSchedule(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete class schedule successfully!',
    data,
  })
})

export const classScheduleController = {
  createClassSchedule,
  retrieveAllClassSchedule,
  updateClassSchedule,
  retrieveSingleClassSchedule,
  deleteClassSchedule,
}

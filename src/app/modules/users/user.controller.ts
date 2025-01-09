import httpStatus from 'http-status'

import sendResponse from '../../utils/sendResponse'
import CatchAsync from '../auth/CatchAsync'
import { userServices } from './user.services'

const createUser = CatchAsync(async (req, res) => {
  const data = await userServices.createUser(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Create user successfully!',
    data,
  })
})
const createAdmin = CatchAsync(async (req, res) => {
  const data = await userServices.createAdmin(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Create admin successfully!',
    data,
  })
})
const createTrainer = CatchAsync(async (req, res) => {
  const data = await userServices.createTrainer(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Create trainer successfully!',
    data,
  })
})
const retrieveAllUsers = CatchAsync(async (req, res) => {
  const data = await userServices.retrieveAllUsers()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve all users successfully!',
    data,
  })
})
const retrieveMyProfile = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await userServices.retrieveMyProfile(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve user successfully!',
    data,
  })
})
const updateUser = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await userServices.updateUser(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update user successfully!',
    data,
  })
})
const deleteUser = CatchAsync(async (req, res) => {
  const { id } = req.params
  const data = await userServices.deleteUser(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete user successfully!',
    data,
  })
})

export const userController = {
  createUser,
  retrieveAllUsers,
  updateUser,
  retrieveMyProfile,
  deleteUser,
  createAdmin,
  createTrainer,
}

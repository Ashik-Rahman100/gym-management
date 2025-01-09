import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userServices } from './user.services'

const createUser = catchAsync(async (req, res) => {
  const data = await userServices.createUser(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Create user successfully!',
    data,
  })
})
const createAdmin = catchAsync(async (req, res) => {
  const data = await userServices.createAdmin(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Create admin successfully!',
    data,
  })
})
const createTrainer = catchAsync(async (req, res) => {
  const data = await userServices.createTrainer(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Create trainer successfully!',
    data,
  })
})
const retrieveAllUsers = catchAsync(async (req, res) => {
  const data = await userServices.retrieveAllUsers()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve all users successfully!',
    data,
  })
})
const retrieveMyProfile = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = await userServices.retrieveMyProfile(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieve user successfully!',
    data,
  })
})
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const data = await userServices.updateUser(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update user successfully!',
    data,
  })
})
const deleteUser = catchAsync(async (req, res) => {
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

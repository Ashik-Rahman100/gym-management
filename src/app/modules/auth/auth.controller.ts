import httpStatus from 'http-status'
import config from '../../config'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { authServices } from './auth.services'

const userLogin = catchAsync(async (req, res) => {
  const data = await authServices.userLogin(req.body)
  console.log(data)

  const { refreshToken } = data

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully!',
    data,
  })
})

export const authController = { userLogin }

import httpStatus from 'http-status'
import config from '../../config'

import sendResponse from '../../utils/sendResponse'
import { authServices } from './auth.services'
import CatchAsync from './CatchAsync'

const userLogin = CatchAsync(async (req, res) => {
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

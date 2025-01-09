import httpStatus from 'http-status'
import config from '../../config'
import { getAccessToken } from '../../helpers/AccessToken'
import { ComparePassword } from '../../helpers/compare-password'
import prisma from '../../helpers/prisma'
import { AppError } from '../../utils/AppError'

const userLogin = async (payload: { email: string; password: string }) => {
  const isExistUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  })

  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }

  const isMatchedPassword = await ComparePassword(
    payload.password,
    isExistUser.password,
  )

  if (!isMatchedPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, ' Invalid credentials')
  }

  const accessTokenData = {
    email: isExistUser.email,
    name: isExistUser.fullName,
    role: isExistUser.role,
    id: isExistUser.id,
  }

  const accessToken = await getAccessToken(
    accessTokenData,
    config.access_token as string,
    config.access_in as string,
  )

  const refreshToken = await getAccessToken(
    accessTokenData,
    config.refresh_token as string,
    config.refresh_in as string,
  )
  return {
    // email: isExistUser.email,
    // name: isExistUser.fullName,
    // role: isExistUser.role,
    // id: isExistUser.id,
    accessToken,
    refreshToken,
  }
}

export const authServices = { userLogin }

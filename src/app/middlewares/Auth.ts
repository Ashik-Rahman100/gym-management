import httpStatus from 'http-status'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../config'
import prisma from '../helpers/prisma'
import { DecodedToken } from '../interface'
import CatchAsync from '../modules/auth/CatchAsync'
import { AppError } from '../utils/AppError'

const Auth = (...userRoles: string[]) => {
  return CatchAsync(async (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access!')
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      config.access_token as Secret,
    ) as JwtPayload

    const { email, role, exp, id } = decoded

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000)
    if (exp! < currentTime) {
      throw new AppError(498, 'Access token has expired!')
    }

    // Verify user in the database
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    // Check role
    if (userRoles.length > 0 && !userRoles.includes(role)) {
      throw new AppError(httpStatus.FORBIDDEN, 'Unauthorized access!')
    }

    // Attach user to request
    req.user = decoded as DecodedToken

    next()
  })
}

export default Auth

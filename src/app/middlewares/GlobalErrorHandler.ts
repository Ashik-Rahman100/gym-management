/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

import ApiError from '../../errors/ApiError'

import { ZodError } from 'zod'
import handleZodError from '../../errors/handleZodError'
// import { IGenericErrorMessage } from '../../interfaces/error';

import config from '../config'
import { IGenericErrorMessage } from '../interface/error'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  config.node_env === 'development'
    ? console.log(` globalErrorHandler ~~`, { error })
    : console.error(` globalErrorHandler ~~`, error)

  let statusCode = 500
  let message = 'Something went wrong !'
  let errorDetails: IGenericErrorMessage[] = []

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorDetails = simplifiedError.errorDetails
  } else if (error instanceof ApiError) {
    // console.log('Path ++', error);
    statusCode = error?.statusCode
    message = error.message
    errorDetails = error?.message
      ? [
          {
            field: error.name,
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    // console.log('Path++', error);
    message = error?.message
    errorDetails = error?.message
      ? [
          {
            field: error.name,
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    stack: config.node_env !== 'production' ? error?.stack : undefined,
  })
}

export default globalErrorHandler

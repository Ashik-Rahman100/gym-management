import { ZodError, ZodIssue } from 'zod'
import { IGenericErrorResponse } from '../app/interface/common'
import { IGenericErrorMessage } from '../app/interface/error'

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      field: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })

  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorDetails: errors,
  }
}

export default handleZodError

import { Response } from 'express'

const errorResponse = (
  res: Response,
  error: Error,
  message: string = 'Something went wrong'
) => {
  res.send({
    status: res.statusCode,
    message,
    success: false,
    error: error,
    stack: error.stack ?? null
  })
}

export default errorResponse

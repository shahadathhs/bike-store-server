import { Response } from 'express'

const errorResponse = (res: Response, message: string) => {
  res.send({
    status: res.statusCode,
    message,
    success: false,
    error: res.locals.error,
    stack: res.locals.error?.stack
  })
}

export default errorResponse

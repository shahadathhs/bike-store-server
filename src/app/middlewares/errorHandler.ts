import { NextFunction, Request, Response } from 'express'
import { logger } from '../log/logger'
import errorResponse from '../res/error.res'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // * Log the error message
  logger.logError.error(err.message)

  // * Send a generic error message if the error wasn't handled
  if (!res.headersSent) {
    res.status(500)
    errorResponse(res, err)
  }

  // * Pass the error to the next middleware
  next()
}

export default errorHandler

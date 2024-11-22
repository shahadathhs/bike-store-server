import { NextFunction, Request, Response } from 'express'
import { logger } from '../log/logger'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // ** Log error message
  logger.logError.error(err.message)

  // ** Send error response
  res.status(500).json({
    message: 'Something went wrong',
    error:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Internal Server Error'
  })

  // ** Pass error to the next middleware
  next()
}

export default errorHandler

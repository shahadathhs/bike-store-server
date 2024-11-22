import { Request, Response, NextFunction } from 'express'
import logger from '../log/logger'

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info('Incoming Request', {
    method: req.method,
    url: req.url,
    body: req.body,
    query: req.query,
    params: req.params,
    headers: req.headers
  })

  next()
}

export default logMiddleware

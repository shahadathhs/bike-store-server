import { Request, Response, NextFunction } from 'express'
import { logger } from '../log/logger'

const logInfo = logger.logInfo

const apiInfoLogger = (req: Request, res: Response, next: NextFunction) => {
  logInfo.info('Incoming Request', {
    method: req.method,
    url: req.url,
    body: req.body ? JSON.stringify(req.body) : 'No body content',
    query: req.query ? JSON.stringify(req.query) : 'No query content',
    params: req.params ? JSON.stringify(req.params) : 'No params content',
    headers: req.headers
  })

  next()
}

export default apiInfoLogger

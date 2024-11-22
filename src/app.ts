import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import APIInfoLogger from './app/middlewares/logger'
import { logger } from './app/log/logger'

// ** express app **
const app: Application = express()

// ** parse request body **
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ** cors **
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:4173',
      'http://localhost:4174'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  })
)

// ** logMiddleware globally **
app.use(APIInfoLogger)

// ** API Endpoint Not Found **
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Endpoint not found' })
})

// ** Error Handler **
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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
})

// ** Default Routes **
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Bike Shop Server!')
})
app.get('/api/v1', (req: Request, res: Response) => {
  res.send('This is the root API route!')
})

export default app

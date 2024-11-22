import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import logMiddleware from './app/middlewares/logger'

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
app.use(logMiddleware)

// ** routes **
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Bike Shop Server!')
})

app.get('/api/v1', (req: Request, res: Response) => {
  res.send('This is the root API route!')
})

export default app

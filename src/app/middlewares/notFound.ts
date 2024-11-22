import { Request, Response } from 'express'

const notFound = (req: Request, res: Response) => {
  res.send({
    status: 404,
    success: false,
    message: 'API Not Found'
  })
}

export default notFound
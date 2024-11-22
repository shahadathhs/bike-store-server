import { Request, Response } from 'express'
import { bikeServices } from './bike.services'

const createBike = async (req: Request, res: Response) => {
  const result = await bikeServices.createBikeService(req.body)
  res.send(result)
}

const getAllBikes = async (req: Request, res: Response) => {
  const result = await bikeServices.getAllBikesService()
  res.send(result)
}

const getBikeById = async (req: Request, res: Response) => {
  const result = await bikeServices.getBikeByIdService(req.params.id)
  res.send(result)
}

const updateBike = async (req: Request, res: Response) => {
  const result = await bikeServices.updateBikeService(
    req.params.id,
    req.body
  )
  res.send(result)
}

const deleteBike = async (req: Request, res: Response) => {
  const result = await bikeServices.deleteBikeService(req.params.id)
  res.send(result)
}

export const bikeController = {
  createBike,
  getAllBikes,
  getBikeById,
  updateBike,
  deleteBike
}

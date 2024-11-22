import { NextFunction, Request, Response } from 'express'
import { bikeServices } from './bike.services'
import errorResponse from '../../res/error.res'
import successResponse from '../../res/success.res'

/**
 * Handles the creation of a new bike.
 *
 * Receives HTTP POST requests with bike details in the request body,
 * passes them to the createBikeService for processing and persists
 * the new bike in the database.
 *
 * On success, sends a success response with the created bike details.
 * On failure, sends an error response detailing the failure reason.
 *
 * @param req - The HTTP request object containing bike data in its body.
 * @param res - The HTTP response object used to send back the desired response.
 * @param next - The next middleware function in the Express request-response cycle.
 */
const createBike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bikeServices.createBikeService(req.body)
    successResponse(res, result, 'Bike created successfully.')
  } catch (error) {
    errorResponse(res, error as Error, 'Failed to create bike.')
    next(error)
  }
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
  const result = await bikeServices.updateBikeService(req.params.id, req.body)
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

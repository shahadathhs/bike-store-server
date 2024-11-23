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

/**
 * Handles GET requests for retrieving all bikes, with optional search functionality.
 *
 * Accepts an optional search term as a query parameter to filter bikes by name,
 * brand, or category, with case-insensitive search. Passes the search term to
 * getAllBikesService for fetching bikes.
 *
 * On success, sends a success response with the list of retrieved bikes.
 * If no bikes are found, sends a 404 error response.
 * On failure, sends an error response detailing the failure reason.
 *
 * @param req - The HTTP request object containing an optional searchTerm in its query.
 * @param res - The HTTP response object used to send back the desired response.
 * @param next - The next middleware function in the Express request-response cycle.
 */
const getAllBikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchTerm = req.query.searchTerm as string
    const result = await bikeServices.getAllBikesService(searchTerm)
    if (result.length === 0) {
      errorResponse(res, new Error('No bikes found.'), 'Bikes not found.', 404)
      return
    }
    successResponse(res, result, 'Bikes retrieved successfully.')
  } catch (error) {
    errorResponse(res, error as Error, 'Failed to retrieve bikes.')
    next(error)
  }
}

/**
 * Handles GET requests for retrieving a single bike by its ID.
 *
 * Receives the bike ID as a route parameter (productId) and
 * passes it to the getBikeByIdService for processing.
 *
 * On success, sends a success response with the retrieved bike details.
 * On failure, sends an error response detailing the failure reason.
 * If the bike is not found, sends a 404 error response.
 *
 * @param req - The HTTP request object containing the bike ID in its params.
 * @param res - The HTTP response object used to send back the desired response.
 * @param next - The next middleware function in the Express request-response cycle.
 */
const getBikeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bikeServices.getBikeByIdService(req.params.productId)
    if (!result) {
      errorResponse(res, new Error('Bike not found.'), 'Bike not found.', 404)
      return
    }
    successResponse(res, result, 'Bike retrieved successfully.')
  } catch (error) {
    errorResponse(res, error as Error, 'Failed to retrieve bike.')
    next(error)
  }
}

const updateBike = async (req: Request, res: Response) => {
  const result = await bikeServices.updateBikeService(req.params.productId, req.body)
  res.send(result)
}

const deleteBike = async (req: Request, res: Response) => {
  const result = await bikeServices.deleteBikeService(req.params.productId)
  res.send(result)
}

export const bikeController = {
  createBike,
  getAllBikes,
  getBikeById,
  updateBike,
  deleteBike
}

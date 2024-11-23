import { Request, Response, NextFunction } from 'express'
import errorResponse from '../../res/error.res'
import successResponse from '../../res/success.res'
import { IOrder } from './order.interface'
import { orderServices } from './order.services'

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, product, quantity, totalPrice } = req.body

    // Validate required fields
    if (!email || !product || !quantity || !totalPrice) {
      errorResponse(
        res,
        new Error('Missing required fields'),
        'Invalid input',
        400
      )
      return
    }

    // Call service to create order
    const order = await orderServices.createOrderService({
      email,
      product,
      quantity,
      totalPrice
    } as IOrder)

    // Send success response
    successResponse(res, order, 'Order created successfully')
  } catch (error) {
    errorResponse(res, error as Error, 'Failed to create order')
    next(error)
  }
}
const calculateRevenue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const totalRevenue = await orderServices.calculateRevenueService()
    successResponse(res, { totalRevenue }, 'Revenue calculated successfully')
  } catch (error) {
    errorResponse(res, error as Error, 'Failed to calculate revenue')
    next(error)
  }
}

export const orderController = {
  createOrder,
  calculateRevenue
}

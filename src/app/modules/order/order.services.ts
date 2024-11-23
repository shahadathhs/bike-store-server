import { Bike } from '../bike/bike.model'
import { IOrder } from './order.interface'
import { Order } from './order.model'

const createOrderService = async (payload: IOrder): Promise<IOrder> => {
  const { product, quantity } = payload

  // Find the bike in the inventory
  const bike = await Bike.findById(product)
  if (!bike) {
    throw new Error('Bike not found.')
  }

  // Check inventory quantity
  if (bike.quantity < quantity) {
    throw new Error('Insufficient stock to complete the order.')
  }

  // Reduce inventory and update inStock if necessary
  bike.quantity -= quantity
  if (bike.quantity === 0) {
    bike.inStock = false
  }
  await bike.save()

  // Create the order
  const order = new Order(payload)
  const result = await order.save()
  return result
}

const calculateRevenueService = async (): Promise<number> => {
  const revenueAggregation = await Order.aggregate([
    {
      $group: {
        _id: null, // Group all orders
        totalRevenue: { $sum: '$totalPrice' } // Sum totalPrice from all orders
      }
    }
  ])

  return revenueAggregation[0]?.totalRevenue || 0 // Return 0 if no revenue
}

export const orderServices = {
  createOrderService,
  calculateRevenueService
}
import { Router } from 'express'
import { bikeController } from './bike.controller'
import { validateRequest } from '../../middlewares/validate.middleware'
import { bikeSchema } from './bike.schema'

const router = Router()

router.post(
  '/',
  validateRequest(bikeSchema, 'Bike Validation Error'),
  bikeController.createBike
)
router.get('/', bikeController.getAllBikes)
router.get('/:productId', bikeController.getBikeById)
router.put('/:productId', bikeController.updateBike)
router.delete('/:productId', bikeController.deleteBike)

export const bikeRoutes = router

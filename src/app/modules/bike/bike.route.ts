import { Router } from 'express'
import { bikeController } from './bike.controller'

const router = Router()

router.post('/', bikeController.createBike)
router.get('/', bikeController.getAllBikes)
router.get('/:productId', bikeController.getBikeById)
router.put('/:productId', bikeController.updateBike)
router.delete('/:productId', bikeController.deleteBike)

export const bikeRoutes = router
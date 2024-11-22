import { IBike } from './bike.interface'
import { Bike } from './bike.model'

const createBikeService = async (payload: IBike): Promise<IBike> => {
  const result = await Bike.create(payload)
  return result
}

const getAllBikesService = async (): Promise<IBike[]> => {
  const result = await Bike.find({})
  return result
}

const getBikeByIdService = async (id: string): Promise<IBike | null> => {
  const result = await Bike.findById(id)
  return result
}

const updateBikeService = async (
  id: string,
  payload: IBike
): Promise<IBike | null> => {
  const result = await Bike.findOneAndUpdate({ _id: id }, payload, {
    new: true
  })
  return result
}

const deleteBikeService = async (id: string): Promise<IBike | null> => {
  const result = await Bike.findByIdAndDelete(id)
  return result
}

export const bikeServices = {
  createBikeService,
  getAllBikesService,
  getBikeByIdService,
  updateBikeService,
  deleteBikeService
}
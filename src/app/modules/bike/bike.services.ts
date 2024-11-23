import { IBike } from './bike.interface'
import { Bike } from './bike.model'

/**
 * Creates a new bike in the database.
 *
 * @param payload - The bike data to be created, adhering to the IBike interface.
 * @returns A promise that resolves to the created bike object.
 */
const createBikeService = async (payload: IBike): Promise<IBike> => {
  const result = await Bike.create(payload)
  return result
}

/**
 * Retrieves all bikes from the database.
 * If a search term is provided, it will be used to search for
 * bikes with matching name, brand, or category.
 * The search is case-insensitive.
 * @param searchTerm - The search term to use for the query.
 * @returns A promise that resolves to an array of IBike objects.
 */
const getAllBikesService = async (searchTerm?: string): Promise<IBike[]> => {
  if (searchTerm) {
    const result = await Bike.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } }
      ]
    })
    return result
  }
  const result = await Bike.find({})
  return result
}

/**
 * Retrieves a bike by its ID.
 *
 * @param id - The ID of the bike to be retrieved.
 * @returns A promise that resolves to the retrieved bike object, or null if no bike with the given ID exists.
 */
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

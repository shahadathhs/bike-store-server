import mongoose, { Schema } from 'mongoose'
import { IBike } from './bike.interface'

const BikeSchema: Schema<IBike> = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
      required: true
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, default: true }
  },
  { timestamps: true }
)

export const Bike = mongoose.model<IBike>('Bike', BikeSchema)

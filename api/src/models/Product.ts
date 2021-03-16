import mongoose from 'mongoose'

import { VariantSchema } from './Variant'

export const ProductSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: String,
  active: { type: Boolean, required: true },
  variants: [VariantSchema],
})

export const Product = mongoose.model('Product', ProductSchema)

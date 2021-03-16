import mongoose from 'mongoose'

import { PrintfulSchema, PrintifySchema } from './Procurement'

export const VariantSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  color: String,
  size: String,
  material: String,
  active: { type: Boolean, required: true },
  procurement: { type: String, required: true },
})

export const Variant = mongoose.model('Variant', VariantSchema)

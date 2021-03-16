import mongoose from 'mongoose'

export const PrintifySchema = new mongoose.Schema({
  _id: { type: String, required: true },
  prtfy_product_id: { type: String, required: true },
  prtfy_variant_id: { type: String, required: true },
})

export const PrintfulSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  prful_sync_variant_id: { type: String, required: true },
  prful_variant_id: { type: String, required: true },
})

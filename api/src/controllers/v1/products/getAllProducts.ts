import { Context } from 'koa'
import mongoose from 'mongoose'

import { stripe } from '../../../util/stripe'

/**
 * Gets all the active Products in the Stripe store.
 * @param ctx
 */
const getAllProducts = async (ctx: Context) => {
  console.log(mongoose.connection.readyState)
  return stripe.products
    .list({
      active: true,
      limit: 100,
    })
    .then(value => {
      ctx.response.body = value.data
    })
    .catch(err => {
      console.error(err)
      ctx.response.status = 500
      ctx.response.body = 'An unknown error occurred.'
    })
}

export default getAllProducts

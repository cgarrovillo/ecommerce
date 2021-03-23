import { Context } from 'koa'
import Stripe from 'stripe'

import { stripe } from '../../../util/stripe'

/**
 * Gets the Stripe.Price object of a given Stripe.Product.id
 * @param req
 * @param res
 */
const getPrices = async (ctx: Context) => {
  const product_id = ctx.params.productid

  if (product_id === 'undefined') {
    ctx.response.status = 400
    return (ctx.response.body = 'Invalid product_id.')
  }

  const prod = typeof product_id != 'string' ? product_id[0] : product_id

  return stripe.prices
    .list({
      active: true,
      product: prod,
      expand: ['data.product'],
    })
    .then(value => {
      // If there's only one price object, return it by itself. Otherwise, return the whole array.
      const data: Stripe.Price | Stripe.Price[] =
        value.data.length === 1 ? value.data[0] : value.data
      ctx.response.body = data
    })
    .catch(err => {
      console.error(err)
      ctx.response.status = 500
      ctx.response.body = 'An unknown error occurred.'
    })
}

export default getPrices

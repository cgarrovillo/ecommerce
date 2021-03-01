import { Context } from 'koa'

import { stripe } from '../../util/stripe'

/**
 * Gets all the active Products in the Stripe store.
 * @param ctx
 */
const getAllProducts = async (ctx: Context) => {
  return stripe.products
    .list({
      active: true,
    })
    .then(value => {
      ctx.response.body = value.data
    })
    .catch(err => {
      console.error(err)
      ctx.body = 'An unknown error occurred.'
    })
}

export default getAllProducts

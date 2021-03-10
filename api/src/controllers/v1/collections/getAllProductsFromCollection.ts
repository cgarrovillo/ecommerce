import { Context } from 'koa'
import Stripe from 'stripe'

import { stripe } from '../../../util/stripe'

/**
 * Gets a collection Stripe.Price objects containing Stripe.Product objects with the matching given 'collection'
 * Checked against the Product.metadata.collection property.
 * @param req
 * @param res
 */
const getCollection = async (ctx: Context) => {
  const collectionName = ctx.params.collection

  return stripe.prices
    .list({
      active: true,
      expand: ['data.product'],
      limit: 100,
    })
    .then(price => {
      // Filter the Prices that have a Product object with a metadata.collection property that matches the collectionName found in the query.
      const collection = price.data.filter(priceData => {
        const product = <Stripe.Product>priceData?.product
        return product?.metadata?.collection === collectionName
      })

      // Return Stripe.Prices[]
      ctx.response.body = collection
    })
    .catch(err => {
      console.error(err)
      ctx.response.status = 500
      ctx.response.body = 'An unknown error occurred.'
    })
}

export default getCollection

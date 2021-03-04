import { Context } from 'koa'

import { stripe } from '../../util/stripe'

/**
 * Gets all the active Products with the metadata:collection in the Stripe store.
 * @param ctx
 */
const getAllProductsFromCollection = async (ctx: Context) => {
  const collectionName: string = ctx.params.collection

  return stripe.products
    .list({
      active: true,
    })
    .then(value => {
      // Filter all items with only Products with matching metadata.collection
      const collection = value.data.filter(
        product => product.metadata.collection === collectionName
      )

      ctx.response.body = collection
    })
    .catch(err => {
      console.error(err)
      ctx.body = 'An unknown error occurred.'
    })
}

export default getAllProductsFromCollection

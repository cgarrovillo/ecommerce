import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_RESTRICTED_KEY!, {
  apiVersion: '2020-08-27',
})

/**
 * Gets a collection Stripe.Price objects containing Stripe.Product objects with the matching given 'collection'
 * Checked against the Product.metadata.collection property.
 * @param req
 * @param res
 */
const getCollection = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { collectionName },
  } = req

  return stripe.prices
    .list({
      active: true,
      expand: ['data.product'],
    })
    .then(price => {
      // Filter the Prices that have a Product object with a metadata.collection property that matches the collectionName found in the query.
      const collection = price.data.filter(priceData => {
        const product = <Stripe.Product>priceData?.product
        return product?.metadata?.collection === collectionName
      })
      res.json(collection)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('An unknown error occurred.')
    })
}

export default getCollection

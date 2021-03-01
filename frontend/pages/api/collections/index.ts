import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_RESTRICTED_KEY!, {
  apiVersion: '2020-08-27',
})

/**
 * Gets all the active Products that has a metadata.collection in the Stripe store.
 * @param ctx
 */
const getAllProductsWithCollection = async (req: NextApiRequest, res: NextApiResponse) => {
  return stripe.products
    .list({
      active: true,
    })
    .then(value => {
      res.json(value.data.filter(product => product.metadata?.collection))
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('An unknown error occurred.')
    })
}

export default getAllProductsWithCollection

import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_RESTRICTED_KEY!, {
  apiVersion: '2020-08-27',
})

/**
 * Gets all the active Prices in the Stripe store.
 * @param ctx
 */
const getAllPrices = async (req: NextApiRequest, res: NextApiResponse) => {
  return stripe.prices
    .list({
      active: true,
      expand: ['product'],
    })
    .then(value => {
      res.json(value.data)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('An unknown error occurred.')
    })
}

export default getAllPrices

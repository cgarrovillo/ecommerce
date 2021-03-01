import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_RESTRICTED_KEY!, {
  apiVersion: '2020-08-27',
})

/**
 * Gets the Prices of a given Stripe.Product.id
 * @param req
 * @param res
 */
const getPrices = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { product_id },
  } = req
  const prod = typeof product_id != 'string' ? product_id[0] : product_id

  return stripe.prices
    .list({
      active: true,
      product: prod,
    })
    .then(value => {
      res.json(value.data)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('An unknown error occurred.')
    })
}

export default getPrices

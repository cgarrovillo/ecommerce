import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_RESTRICTED_KEY!, {
  apiVersion: '2020-08-27',
})

/**
 * Gets the Stripe.Price object of a given Stripe.Product.id
 * @param req
 * @param res
 */
const getPrices = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { product_id },
  } = req

  if (product_id === 'undefined') {
    return res.status(400).send('Invalid product_id.')
  }

  const prod = typeof product_id != 'string' ? product_id[0] : product_id

  return stripe.prices
    .list({
      active: true,
      product: prod,
    })
    .then(value => {
      // If there's only one price object, return it by itself. Otherwise, return the whole array.
      const data = value.data.length === 1 ? value.data[0] : value.data
      res.json(data)
    })
    .catch(err => {
      console.error(err)
      console.log('\n\n')
      res.status(500).send('An unknown error occurred.')
    })
}

export default getPrices

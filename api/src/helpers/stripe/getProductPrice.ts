import { stripe } from '../util/stripe'

/**
 * Returns the prices for a given product
 * @param product The ID of the Product to get the price for
 */
const getProductPrice = async (product: string) => {
  const prices = await stripe.prices.list({
    active: true,
    product: product,
  })

  return Promise.resolve([...prices.data])
}

export default getProductPrice

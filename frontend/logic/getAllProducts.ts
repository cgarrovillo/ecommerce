import { stripe } from '../utils/stripe'

const getAllProducts = async () => {
  const products = await stripe.products.list({
    active: true,
  })

  return Promise.resolve(products)
}

export default getAllProducts

import Stripe from 'stripe'

import { stripe } from '../../util/stripe'
import { CartItem } from '../../types/usc'

/**
 * Validates the cart_items to be a valid inventory item, and the pricing data from Stripe is used to create a line_item.
 * @param cart_items The cart items to validate
 * @returns An array of type Stripe line_item
 */
const processCartItems = async (
  cart_items: CartItem[]
): Promise<Stripe.Checkout.SessionCreateParams.LineItem[]> => {
  if (cart_items.length === 0) {
    throw new Error('Empty cart_item')
  }

  // Fetch our whole inventory; up to 100
  const inventory = await stripe.prices.list({
    active: true,
    expand: ['data.product'],
    limit: 100,
  })

  // Filter the cart_items to only have items that has a valid product id from our database (Stripe atm)
  const filtered = cart_items.filter(item =>
    inventory.data.some(product => product.id === item.id && item.quantity > 0)
  )

  // Fail-fast if filtered items turn out to be empty
  if (filtered.length === 0) throw new Error('Invalid Cart items.')

  // Return an array of line items derived from the contents of the filtered array
  return filtered.map(item => {
    return {
      price: item.id,
      adjustable_quantity: {
        enabled: true,
      },
      quantity: item.quantity,
    }
  })
}

export default processCartItems

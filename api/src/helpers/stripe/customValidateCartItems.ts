import Stripe from 'stripe'
import _ from 'lodash'

import { stripe } from '../../util/stripe'
import { CartItem } from '../../types/usc'

type Combined = Stripe.Price & CartItem

/**
 * Validates the cart_items to be a valid inventory item, and the pricing data from Stripe is used to create a line_item.
 * @param cart_items The cart items to validate
 * @returns An array of line_item
 */
const validateCartItems = async (cart_items: CartItem[]) => {
  const inventory = await stripe.prices.list({
    active: true,
    expand: ['data.product'],
    limit: 100,
  })

  // Find the intersection of the inventory and the cart items.
  const matches: Stripe.Price[] = _.intersectionBy(inventory.data, cart_items, 'id')

  if (matches.length === 0) {
    return
  }

  const merged = _.merge(matches, cart_items)
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = merged.map(
    (item: Combined) => {
      return {
        price: item.id,
        adjustable_quantity: {
          enabled: true,
        },
        quantity: item.quantity,
      }
    }
  )

  return line_items
}

export default validateCartItems

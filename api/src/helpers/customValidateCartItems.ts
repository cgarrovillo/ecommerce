import Stripe from 'stripe'

import getProductPrice from './getProductPrice'
import type { CartItem } from '../util/types'

/**
 * Custom In-house Validation
 * @param inventorySrc
 * @param cartDetails
 */
const validateCartItems = async (cartDetails: Array<CartItem>) => {
  const validatedItems = []

  for (const cartItem of cartDetails) {
    // Check if the product exists in Stripe at all
    const prices = await getProductPrice(cartItem.id)

    if (!prices || prices.length === 0) {
      return
    }

    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      price: prices[0].id,
      quantity: cartItem.quantity,
    }

    validatedItems.push(lineItem)
  }

  return validatedItems
}

export default validateCartItems

import Stripe from 'stripe'
import _ from 'lodash'

import { CartItem } from '../util/types'

type Combined = Stripe.Price & CartItem

const validateCartItems = (inventory: Stripe.Price[], cart_items: CartItem[]) => {
  const matches: Stripe.Price[] = _.intersectionBy(inventory, cart_items, 'id')

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

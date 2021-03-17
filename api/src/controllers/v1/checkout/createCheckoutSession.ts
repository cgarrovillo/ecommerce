import { Context } from 'koa'

import { stripe } from '../../../util/stripe'
import { CONSTANTS } from '../../../util/constants'
import type { CartItem, Checkout } from '../../../types/usc'

import processCartItems from '../../../helpers/stripe/processCartItems'

const createCheckoutSession = async (ctx: Context) => {
  const cart = ctx.request.body as CartItem[]

  if (!cart || cart.length === 0) {
    ctx.status = 500
    return
  }

  try {
    // Turn the cart_items into line_items
    const line_items = await processCartItems(cart)

    const session = await stripe.checkout.sessions.create(
      {
        allow_promotion_codes: true,
        billing_address_collection: 'auto',
        expand: ['line_items'],
        mode: 'payment',
        payment_method_types: ['card'],
        // @ts-ignore
        shipping_rates: ['shr_1ITJsNJe4oNYc3QvZnoE62W8'],
        shipping_address_collection: {
          allowed_countries: ['US', 'CA'],
        },
        line_items: line_items,
        submit_type: 'pay',
        success_url: `${CONSTANTS.URLS.STORE_DOMAIN}?success=true`,
        cancel_url: `${CONSTANTS.URLS.STORE_DOMAIN}?canceled=true`,
      },
      {
        // TODO: Indempotency
      }
    )

    // Return with session id
    ctx.body = session.id
  } catch (err) {
    console.error(err)
    ctx.status = 500
    return
  }
}

export default createCheckoutSession

import { Context } from 'koa'
import Stripe from 'stripe'

import { stripe } from '../../../util/stripe'
import { URLS } from '../../../util/constants'
import { CartItem } from '../../../util/types'

import validateCartItems from '../../../helpers/customValidateCartItems'

const createCheckoutSession = async (ctx: Context) => {
  const cart_items = ctx.request.body as CartItem[]

  try {
    // Turn the cart_items into line_items
    const line_items = await validateCartItems(cart_items)

    if (!line_items) {
      ctx.status = 500
      return
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      // @ts-ignore
      shipping_rates: ['shr_1ITJsNJe4oNYc3QvZnoE62W8'],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      line_items: line_items,
      mode: 'payment',
      success_url: `${URLS.STORE_DOMAIN}?success=true`,
      cancel_url: `${URLS.STORE_DOMAIN}?canceled=true`,
    })

    // Return with session id
    ctx.body = session.id
  } catch (err) {
    console.error(err)
    ctx.status = 500
  }
}

export default createCheckoutSession

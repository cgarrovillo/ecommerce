import { Context } from 'koa'
import Stripe from 'stripe'

import { stripe } from '../../../util/stripe'
import { URLS } from '../../../util/constants'
import { CartItem } from '../../../util/types'

import validateCartItems from '../../../helpers/customValidateCartItems'

const createCheckoutSession = async (ctx: Context) => {
  const cart_items = ctx.request.body as CartItem[]

  try {
    // Validate cart_items

    const inventory = await stripe.prices.list({
      active: true,
      expand: ['data.product'],
      limit: 100,
    })

    const line_items = validateCartItems(inventory.data, cart_items)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      // TODO: Determine which countries to ship to
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      line_items: line_items,
      mode: 'payment',
      success_url: `${URLS.STORE_DOMAIN}?success=true`,
      cancel_url: `${URLS.STORE_DOMAIN}?canceled=true`,
      // @ts-ignore
      shipping_rates: ['shr_1ITJsNJe4oNYc3QvZnoE62W8'],
    })

    // Return with session id
    ctx.body = session.id
  } catch (err) {
    console.error(err)
  }
}

export default createCheckoutSession

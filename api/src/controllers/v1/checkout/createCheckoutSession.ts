import { Context } from 'koa'

import { stripe } from '../../../util/stripe'
import { STORE_DOMAIN } from '../../../util/constants'
import validateCartItems from '../../../helpers/customValidateCartItems'
import type { CartItem } from '../../../util/types'

/**
 * Creates the Stripe Checkout session given a cart of item(s) in the Context body.
 * @param ctx Koa Context object with a body containing the cart items.
 * @returns id The newly created Checkout Session ID
 */
const createCheckoutSession = async (ctx: Context) => {
  const cart = <Array<CartItem>>ctx.request.body
  // TODO: Validate Request as valid <Stripe.Product> array

  try {
    const line_items = await validateCartItems(cart)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${STORE_DOMAIN}?success=true`,
      cancel_url: `${STORE_DOMAIN}?cancel=true`,
    })

    // Return with session id
    ctx.body = { id: session.id }
  } catch (err) {
    console.error(err)
  }
}

export default createCheckoutSession

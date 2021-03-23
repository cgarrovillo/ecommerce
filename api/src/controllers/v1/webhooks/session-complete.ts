import { Context } from 'koa'
import Stripe from 'stripe'

import processNewOrder from '../../../helpers/stripe/processNewOrder'

/**
 * Webhook called by Stripe once a checkout session is completed, meaning an item was successfully paid for.
 * @param ctx
 * @returns
 */
const checkoutSessionCompleted = async (ctx: Context) => {
  const event: Stripe.Event = ctx.state.stripeEvent
  const session: Stripe.Checkout.Session = event.data.object as Stripe.Checkout.Session

  // Asynchronously process the order
  processNewOrder(session)
    .then(() => {})
    .catch(err => {
      console.error(`CRITICAL: ${session.payment_intent}`)
      console.error(err)

      return (ctx.status = 500)
    })

  // Return 200 quickly to tell Stripe we received the webhook
  return (ctx.status = 200)
}

export default checkoutSessionCompleted

import { Context, Next } from 'koa'
import { stripe } from '../util/stripe'

const ENDPOINT_SECRET = process.env.STRIPE_WH_CHECKOUT_COMPLETE as string

/**
 * Verifies that the incoming request is coming from Stripe Webhooks
 * @param ctx
 * @param next
 */
const verifyStripeSignature = (ctx: Context, next: Next) => {
  const payload = ctx.request.rawBody
  const sig = ctx.request.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(payload, sig!, ENDPOINT_SECRET)

    // Store the constructed event in Koa Context State. A Context is created per request.
    ctx.state.stripeEvent = event
  } catch (err) {
    // Return if stripe threw an error
    console.error(err.message)
    ctx.response.status = 401
    return (ctx.response.body = 'Unauthorized. Your IP Address has been logged.')
  }

  next()
}

export default verifyStripeSignature

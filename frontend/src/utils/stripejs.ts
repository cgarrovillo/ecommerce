/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.GATSBY_STRIPE_PUBLISHABLE_KEY || ''
    stripePromise = loadStripe(key)
  }
  return stripePromise
}

export default getStripe

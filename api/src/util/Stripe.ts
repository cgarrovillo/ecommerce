import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_RESTRICTED_KEY || '', {
  apiVersion: '2020-08-27',
  typescript: true,
  maxNetworkRetries: 3,
})

export { stripe }

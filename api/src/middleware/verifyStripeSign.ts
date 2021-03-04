import { Context, Next } from 'koa'

import { stripe } from '../util/stripe'

/**
 * Verifies that the incoming request is coming from Stripe Webhooks
 * @param ctx
 * @param next
 */
const verifyStripeSignature = async (ctx: Context, next: Next) => {}

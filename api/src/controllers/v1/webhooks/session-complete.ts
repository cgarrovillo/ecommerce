import { Context } from 'koa'
import Stripe from 'stripe'

import { stripe } from '../../../util/stripe'
import { URLS } from '../../../util/constants'

import createPrintfulOrder from '../../../helpers/printful/create-order'

const checkoutSessionCompleted = async (ctx: Context) => {
  const session: Stripe.Checkout.Session = ctx.state.event
  try {
    createPrintfulOrder(session).then(() => {})

    return (ctx.status = 200)
  } catch (err) {
    console.error(err)
    return (ctx.status = 500)
  }
}

export default checkoutSessionCompleted

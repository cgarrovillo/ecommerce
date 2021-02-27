import { Context } from 'koa'
import { stripe } from '../util/Stripe'

import { STORE_DOMAIN } from '../util/Constants'

const createCheckoutSession = async (ctx: Context) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: '{{PRICE_ID}}',
        adjustable_quantity: {
          enabled: true,
        },
      },
    ],
    mode: 'payment',
    success_url: `${STORE_DOMAIN}?success=true`,
    cancel_url: `${STORE_DOMAIN}?cancel=true`,
  })

  ctx.body = { id: session.id }
}

export default createCheckoutSession

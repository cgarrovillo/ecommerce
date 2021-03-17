import type Stripe from 'stripe'

import createPrintfulOrder from '../fulfillment/createPrintfulOrder'
import { stripe } from '../../util/stripe'
import { CONSTANTS } from '../../util/constants'

/**
 * Asynchronously processes incoming orders
 * @param session
 */
const processNewOrder = async (session: Stripe.Checkout.Session) => {
  const customer = session.customer
  const items = (
    await stripe.checkout.sessions.listLineItems(session.id, {
      limit: 100,
      expand: ['data.price', 'data.price.product', 'data.taxes'],
    })
  ).data

  if (!items || items.length === 0) throw new Error('ERROR: Invalid line_items in created session!')

  let forPrintful = new Set<Stripe.LineItem>()
  let forPrintify = new Set<Stripe.LineItem>()

  for (let i = 0; i < items.length; i++) {
    const product = items[i].price!.product! as Stripe.Product
    console.log(product.metadata)

    // Check for a fulfillment key in the product object's metadata
    if (!('fulfillment' in product.metadata!))
      throw new Error(`ERROR: A product object does not have the required fulfillment metadata!`)

    // Determine different products to be fulfilled
    switch (product.metadata['fulfillment']) {
      case 'printify': {
        forPrintify.add(items[i])
      }
      case 'printful': {
        forPrintful.add(items[i])
      }
      default: {
        throw new Error(`ERROR: A product's metadata doesn't have a valid fulfillment!`)
      }
    }
  }
}

export default processNewOrder

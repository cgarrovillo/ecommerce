// Dependencies of the test
import { stripe } from './.jest/stripe'
import { createMockContext } from '@shopify/jest-koa-mocks'

// Fn to be tested
import createCheckoutSession from '../src/controllers/v1/checkout/createCheckoutSession'
import processCartItems from '../src/helpers/stripe/processCartItems'
import Stripe from 'stripe'

describe('Checkout Process', () => {
  /**
   * Test the /checkout endpoint with a request body containing an empty cart
   */
  test('Empty cart', async () => {
    const ctx = createMockContext({ requestBody: [] })

    await createCheckoutSession(ctx)

    expect(ctx.response.status).toEqual(500)
  })

  /**
   * Test Cart Validation with empty cart
   */
  test('Validation: Empty Cart Items', async () => {
    const cart_items: any = []

    // The test
    await expect(processCartItems(cart_items)).rejects.toThrow()
  })

  /**
   * Test cart item validation with all valid items
   */
  test('Validation: Valid Cart Items', async () => {
    const stripeResp = await stripe.prices.list({
      active: true,
      expand: ['data.product'],
      limit: 100,
    })

    const cart_items = [
      {
        id: 'price_1IPz4nJe4oNYc3QvGLUorkqO',
        quantity: 3,
      },
      {
        id: 'price_1IPbA9Je4oNYc3QvIldqIsMr',
        quantity: 1,
      },
      {
        id: 'price_1IQmYyJe4oNYc3Qv1BlBuokq',
        quantity: 5,
      },
    ]

    const line_items = await processCartItems(cart_items)
    const validated = validateItemsNoLodash(cart_items, stripeResp.data)

    // The test
    expect(line_items).toStrictEqual(validated)
  })

  /**
   * Test Cart Validation with some invalid items
   */
  test('Validation: Invalid Cart Items', async () => {
    const stripeResp = await stripe.prices.list({
      active: true,
      expand: ['data.product'],
      limit: 100,
    })

    const cart_items = [
      {
        id: 'price_1IPz4nJe4oNYc3QvGLUorkqO', // Valid
        quantity: 3,
      },
      {
        id: 'price_1abcdefghijklmnopqrstuvw', // Invalid ID
        quantity: 24,
      },
      {
        id: 'price_1IQmYyJe4oNYc3Qv1BlBuokq', // Invalid quantity
        quantity: -1,
      },
    ]

    const line_items = await processCartItems(cart_items)
    const validated = validateItemsNoLodash(cart_items, stripeResp.data)

    // The test
    expect(line_items).toStrictEqual(validated)
  })
})

type CartItem = {
  id: string
  quantity: number
}

/**
 * Helper function that manually validates the cart items without the use of Lodash.
 * (Lodash is used in the actual API)
 * @param cart The cart_items to simulate
 * @param inventory The "inventory" of Stripe.Price objects
 * @returns an Array of line_item objects
 */
const validateItemsNoLodash = (cart: CartItem[], inventory: Stripe.Price[]) => {
  return cart.flatMap(a => {
    let itemData: CartItem = {
      id: '',
      quantity: 0,
    }

    // Check for Deep Equality between the cart item & the Price from Stripe
    const valid = inventory.some(b => {
      if (a.id === b.id && a.quantity > 0) {
        itemData = a
        return true
      }
    })

    // If valid, return an array containing line_item object
    if (valid) {
      return [
        {
          price: a.id,
          adjustable_quantity: {
            enabled: true,
          },
          quantity: itemData.quantity,
        },
      ]
    }
    // If not valid, return an empty array (so to not include the object in the returned Array)
    else return []
  })
}

// Dependencies of the test
import { createMockContext } from '@shopify/jest-koa-mocks'
import { stripe } from './.jest/stripe'

// Fn to be tested
import getAllProducts from '../src/controllers/v1/products/getAllProducts'

describe('Get all products', () => {
  test('Not empty & all products retrieved', async () => {
    const ctx = createMockContext()
    const stripeResp = await stripe.products.list({
      active: true,
      limit: 100,
    })

    await getAllProducts(ctx)

    expect(ctx.response.body).toStrictEqual(stripeResp.data)
  })
})

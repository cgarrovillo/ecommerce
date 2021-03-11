import Router from '@koa/router'

import verifyStripeSignature from '../../middleware/verifyStripeSign'

import createCheckoutSession from '../../controllers/v1/checkout/createCheckoutSession'
import getAllProducts from '../../controllers/v1/products/getAllProducts'
import getAllFromCollection from '../../controllers/v1/collections/getAllProductsFromCollection'
import getPrice from '../../controllers/v1/prices/getPrice'
import checkoutSessionCompleted from '../../controllers/v1/webhooks/session-complete'

const router = new Router({
  prefix: '/v1',
})

router.post('/checkout', createCheckoutSession)
router.get('/products', getAllProducts)
router.get('/collections/:collection', getAllFromCollection)
router.get('/prices/:productid', getPrice)

// Webhooks
router.post('/webhooks/checkout/complete', verifyStripeSignature, checkoutSessionCompleted)

export default router

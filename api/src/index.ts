import serverless from 'serverless-http'
import Koa from 'koa'
import Router from '@koa/router'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'

import createCheckoutSession from './controllers/v1/checkout/createCheckoutSession'
import getAllProducts from './controllers/v1/products/getAllProducts'
import getAllFromCollection from './controllers/v1/collections/getAllProductsFromCollection'
import getPrice from './controllers/v1/prices/getPrice'

const app = new Koa()
const router = new Router()

app.use(cors())
app.use(bodyParser())

router.post('/checkout', createCheckoutSession)
router.get('/products', getAllProducts)
router.get('/collections/:collection', getAllFromCollection)
router.get('/prices/:productid', getPrice)

app.use(router.routes())
if (process.env.IS_OFFLINE === 'true') {
  app.use(router.allowedMethods())
}

module.exports.handler = serverless(app)

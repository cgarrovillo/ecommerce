import serverless from 'serverless-http'
import Koa from 'koa'
import Router from '@koa/router'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'

import createCheckoutSession from './controllers/checkout/createCheckoutSession'
import getAllProducts from './controllers/products/getAllProducts'
import getAllProductsFromCollection from './controllers/products/getProductsFromCollection'

const app = new Koa()
const router = new Router()

app.use(cors())
app.use(bodyParser())

router.post('/checkout', createCheckoutSession)
router.get('/products', getAllProducts)
router.get('/collection/:collection', getAllProductsFromCollection)

app.use(router.routes())
if (process.env.IS_OFFLINE === 'true') {
  app.use(router.allowedMethods())
}

module.exports.handler = serverless(app)

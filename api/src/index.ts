import serverless from 'serverless-http'
import Koa from 'koa'
import Router from '@koa/router'

import createCheckoutSession from './controllers/createCheckoutSession'

const app = new Koa()
const router = new Router()

router.post('/checkout', createCheckoutSession)

app.use(router.routes())
if (process.env.IS_OFFLINE === 'true') {
  app.use(router.allowedMethods())
}

module.exports.handler = serverless(app)

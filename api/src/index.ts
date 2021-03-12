import serverless from 'serverless-http'
import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'

import v1routes from './controllers/v1/routes'

import connectDB from './util/mongo'

const app = new Koa()

app.use(cors())
app.use(bodyParser())
app.use(async (ctx, next) => {
  await connectDB()
  next()
})

app.use(v1routes.routes())

if (process.env.IS_OFFLINE === 'true') {
  app.use(v1routes.allowedMethods())
}

module.exports.handler = serverless(app)

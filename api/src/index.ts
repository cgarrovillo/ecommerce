import serverless from 'serverless-http'
import Koa from 'koa'

const app = new Koa()

app.use(async ctx => {
  ctx.body = 'Hello World'
})

console.log(app.env)

module.exports.handler = serverless(app)

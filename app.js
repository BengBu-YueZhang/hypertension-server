const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')

const config = require('./config')
const IndexRoute = require('./routes/index')
const BpRoute = require('./routes/BloodPressure.Route')
const BwRoute = require('./routes/BodyWeight.Route')

const port = process.env.PORT || config.port

const mongo = require('./config/mongo')

mongo.connect()

onerror(app)

app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(IndexRoute.routes(), IndexRoute.allowedMethods())
  .use(BpRoute.routes(), BpRoute.allowedMethods())
  .use(BwRoute.routes(), BwRoute.allowedMethods())

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})

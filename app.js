const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()

const cors = require('@koa/cors')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const result = require('./middleware/result')

const config = require('./config')
const IndexRoute = require('./routes/Index.Route')
const BpRoute = require('./routes/BloodPressure.Route')
const BwRoute = require('./routes/BodyWeight.Route')
const UserRoute = require('./routes/User.Route')

const mongo = require('./config/mongo')
const redis = require('./config/redis')

mongo.connect()

onerror(app)

app
  .use(cors({
    origin: '*',
    credentials: true,
    methods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Content-Length',
      'Authorization',
      'Accept',
      'X-Requested-With',
      'x-access-token'
    ]
  }))
  .use(bodyparser())
  .use(json())
  .use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(IndexRoute.routes(), IndexRoute.allowedMethods())
  .use(BpRoute.routes(), BpRoute.allowedMethods())
  .use(BwRoute.routes(), BwRoute.allowedMethods())
  .use(UserRoute.routes(), UserRoute.allowedMethods())
  .use(result())

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

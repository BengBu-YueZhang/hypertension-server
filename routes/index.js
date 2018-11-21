const Router = require('koa-router')
const router = new Router()

router.get('/login', async (ctx, next) => {
  console.log('fuck')
})

module.exports = router

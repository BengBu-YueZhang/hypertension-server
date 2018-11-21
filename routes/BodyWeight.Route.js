const Router = require('koa-router')
const router = new Router({ prefix: '/bw' })

router.post('/add_bw')
router.get('/day_bw_average')

module.exports = router

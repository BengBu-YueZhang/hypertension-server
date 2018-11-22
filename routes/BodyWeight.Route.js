const Router = require('koa-router')
const router = new Router({ prefix: '/bw' })
const BodyWeightController = require('../controller/BodyWeight.Controller')
const isAuth = require('../middleware/isAuth')

router.post('/add_bw', isAuth(), BodyWeightController.addBodyWeightNote)
router.get('/day_bw_average', BodyWeightController.getDayBodyWeightNote)

module.exports = router

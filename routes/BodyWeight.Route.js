const Router = require('koa-router')
const router = new Router({ prefix: '/bw' })
const BodyWeightController = require('../controller/BodyWeight.Controller')

router.post('/add_bw', BodyWeightController.addBodyWeightNote)
router.get('/day_bw_average', BodyWeightController.getDayBodyWeightNote)

module.exports = router

const BloodPressureController = require('../controller/BloodPressure.Controller')
const Router = require('koa-router')
const router = new Router({ prefix: '/bp' })
const isAuth = require('../middleware/isAuth')

router.post('/add_bp', isAuth(), BloodPressureController.addBloodPressureNote)
router.get('/day_bp_average', BloodPressureController.getDayBloodPressureNote)
router.get('/hour_bp_average', BloodPressureController.getHourBloodPressureNote)

module.exports = router

const BloodPressureController = require('../controller/BloodPressure.Controller')
const Router = require('koa-router')
const router = new Router({ prefix: '/bp' })

router.post('/add_bp', BloodPressureController.addBloodPressureNote)
router.get('/day_bp_average', BloodPressureController.getDayBloodPressureNote)
router.get('/hour_bp_average', BloodPressureController.getHourBloodPressureNote)

module.exports = router

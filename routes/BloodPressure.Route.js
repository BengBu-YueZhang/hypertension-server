const BloodPressureController = require('../controller/BloodPressure.Controller')

module.exports =  (router) => {
  router.post('/bp/add_bp', BloodPressureController.addBloodPressureNote)
  router.get('/bp/day_bp_average', BloodPressureController.getDayBloodPressureNote)
  router.get('/bp/hour_bp_average', BloodPressureController.getHourBloodPressureNote)
}

const BloodPressureController = require('../controller/BloodPressure.Controller')

module.exports =  (router) => {
  router.post('/add_bp', BloodPressureController.addBloodPressureNote)
  router.get('/day_bp_average', BloodPressureController.getDayBloodPressureNote)
  router.get('/hour_bp_average', BloodPressureController.getHourBloodPressureNote)
}

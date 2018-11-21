const BloodPressureModel = require('../models/BloodPressure.Model')

module.exports = {
  /**
   * 添加一条血压记录
   */
  async addBloodPressureNote (ctx, next) {
    try {
      let { h, l } = ctx.request.body
      const bloodPressure = new BloodPressureModel({ h, l })
      bloodPressure.save()
    } catch (error) {
      ctx.throw(error)
    } finally {
      await next()
    }
  },

  /**
   * 获取时间范围内每日平均血压
   */
  async getDayBloodPressureNote (ctx, next) {
  },

  /**
   * 获取某一天内每小时的平均血压
   */
  async getHourBloodPressureNote (ctx, next) {
  }
}
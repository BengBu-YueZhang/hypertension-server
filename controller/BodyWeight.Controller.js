const BodyWeightModel = require('../models/BodyWeight.Model')
const R = require('ramda')
const moment = require('moment')

// 本系统, 个人使用所以身高固定
const HEIGHT = 182

module.exports = {
  /**
   * 添加体重记录
   */
  async addBodyWeightNote (ctx, next) {
  },

  /**
   * 获取一段时间范围内每日体重，以及bmi指数
   */
  async getDayBodyWeightNote (ctx, next) {
  }
}

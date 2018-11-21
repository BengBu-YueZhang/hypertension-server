const BloodPressureModel = require('../models/BloodPressure.Model')
const R = require('ramda')
const moment = require('moment')

module.exports = {
  /**
   * 添加一条血压记录
   * @param {Number} h 高压
   * @param {Number} l 低压
   */
  async addBloodPressureNote (ctx, next) {
    try {
      let { h, l } = ctx.request.body
      h = parseInt(h, 10)
      l = parseInt(l, 10)
      if (!R.is(Number, h)) ctx.throw(400, new Error('高压必须是数字类型'))
      if (!R.is(Number, l)) ctx.throw(400, new Error('低压必须是数字类型'))
      const bloodPressure = new BloodPressureModel({ h, l })
      await bloodPressure.save()
      ctx.result = {
        code: 200,
        data: {
          msg: 'success'
        }
      }
    } catch (error) {
      ctx.throw(error)
    } finally {
      await next()
    }
  },

  /**
   * 获取时间范围内每日平均血压
   * @param {Number} start 开始时间  
   * @param {Number} end 结束时间
   */
  async getDayBloodPressureNote (ctx, next) {
    try {
      let { start, end } = ctx.request.query
      if (!R.is(Number, start)) ctx.throw(400, new Error('开始时间必须是数字类型'))
      if (!R.is(Number, end)) ctx.throw(400, new Error('结束时间必须是数字类型'))
      start = moment(new Date(parseInt(start, 10))).toDate()
      end = moment(new Date(parentInt(end, 10))).toDate()
      // 聚合管道
      let result = await BloodPressureModel.aggregate([
        {
          $match: {
            createAt: {
              $gte: start,
              $lte: end
            }
          }
        },
        {
          $project: {
            _id: 0
          }
        },
        {
          $project: {
            formatcreateAt: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createAt"
              }
            }
          }
        },
        {
          $group: {
            _id: {
              createAt: "$formatcreateAt"
            },
            avg_h_bp: {
              $avg: "$h"
            },
            avg_l_bp: {
              $avg: "$l"
            }
          }
        }
      ])
      ctx.result = {
        code: 200,
        data: {
          msg: 'success',
          data: result
        }
      }
    } catch (error) {
      ctx.throw(error)
    } finally {
      await next()
    }
  },

  /**
   * 获取某一天内每小时的平均血压
   * @param {String} day 时间字符串 例如: '2018-01-01'
   */
  async getHourBloodPressureNote (ctx, next) {
    try {
      let { day } = ctx.request.query
      if (!R.is(String, day)) ctx.throw(400, new Error('时间是字符串类型'))
      let start = moment(day).hour(0).minute(0).second(0).millisecond(0).toDate()
      let end = moment(day).hour(23).minute(59).second(59).millisecond(999).toDate()
      let result = await BloodPressureModel.aggregate([
        {
          $match: {
            createAt: {
              $gte: start,
              $lte: end
            }
          }
        },
        {
          $project: {
            _id: 0
          }
        },
        {
          $project: {
            formatcreateAt: {
              $dateToString: {
                format: "%H",
                date: "$createAt"
              }
            }
          }
        },
        {
          $group: {
            _id: {
              createAt: "$formatcreateAt"
            },
            avg_h_bp: {
              $avg: "$h"
            },
            avg_l_bp: {
              $avg: "$l"
            }
          }
        }
      ])
      ctx.result = {
        code: 200,
        data: {
          msg: 'success',
          data: result
        }
      }
    } catch (error) {
      ctx.throw(error)
    } finally {
      await next()
    }
  }
}

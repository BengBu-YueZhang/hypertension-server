const BodyWeightModel = require('../models/BodyWeight.Model')
const R = require('ramda')
const moment = require('moment')

// 本系统, 个人使用所以身高固定
const HEIGHT = 1.82

module.exports = {
  /**
   * 添加体重记录
   */
  async addBodyWeightNote (ctx, next) {
    try {
      let { weight } = ctx.request.body
      weight = parseInt(weight, 10)
      if (!R.is(Number, weight)) ctx.throw(400, new Error('高压必须是数字类型'))
      const bmi = weight / (HEIGHT * HEIGHT)
      const bodyWeight = new BodyWeightModel({ weight, bmi })
      await bodyWeight.save()
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
   * 获取一段时间范围内每日体重，以及bmi指数
   */
  async getDayBodyWeightNote (ctx, next) {
    try {
      let { start, end } = ctx.request.query
      // 默认为7天内的数据
      start = start || moment().subtract('days', 7).hour(0).minute(0).second(0).millisecond(0).toDate().getTime()
      end = end || moment().hour(23).minute(59).second(59).millisecond(999).toDate().getTime()
      start = parseInt(start, 10)
      end = parseInt(end, 10)
      if (!R.is(Number, start)) ctx.throw(400, new Error('开始时间必须是数字类型'))
      if (!R.is(Number, end)) ctx.throw(400, new Error('结束时间必须是数字类型'))
      start = moment(new Date(start)).toDate()
      end = moment(new Date(end)).toDate()
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
            weight: 1,
            bmi: 1,
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
            avg_weight: {
              $avg: "$weight"
            },
            avg_bmi: {
              $avg: "$bmi"
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

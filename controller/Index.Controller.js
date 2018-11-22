const R = require('ramda')
const UserModel = require('../models/User.Model')
const bcrypt = require('../util/bcrypt')
const jwt = require('jsonwebtoken')
const redisClient = require('../config/redis')
const { promisify } = require('util')
const setAsync = promisify(redisClient.set).bind(redisClient)
const secret = require('../util/jwt').secret
const timeout = require('../util/jwt').timeout

module.exports = {
  async login (ctx, next) {
    try {
      const { name, password } = ctx.request.body
      if (!R.is(String, name)) ctx.throw(400, new Error('name必须为字符串'))
      if (!R.is(String, password)) ctx.throw(400, new Error('password必须为字符串'))
      const user = await UserModel.findOne({ name })
      if (!user) ctx.throw(400, new Error('用户不存在'))
      const equal = await bcrypt.compare(user.password, password)
      if (!equal) ctx.throw(400, new Error('用户密码错误'))
      const token = jwt.sign({ id: user._id }, secret, { expiresIn: timeout })
      const redisKey = user._id.toString()
      await setAsync(redisKey, token, 'EX', timeout)
      ctx.result = {
        code: 200,
        data: {
          msg: 'success',
          token
        }
      }
    } catch (error) {
      ctx.throw(500, error)
    } finally {
      await next()
    }
  },

  async logout (ctx, next) {
    try {
      const { id } = ctx.decoded
      await delAsync(id)
    } catch (error) {
      ctx.throw(500, error)
    } finally {
      await next()
    }
  }
}
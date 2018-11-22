const jwt = require('jsonwebtoken')
const secret = require('../config/jwt').secret
const redisClient = require('../config/redis')
const { promisify } = require('util')
const getAsync = promisify(redisClient.get).bind(redisClient)

module.exports = function () {
  return async function (ctx, next) {
    const token = ctx.headers['x-access-token']
    if (token) {
      // token验证
      let decoded = null
      try {
        decoded = await jwt.verify(token, secret)
      } catch (error) {
        ctx.throw(403, 'token失效')
      }
      const { id } = decoded
      // 登录验证
      try {
        await getAsync(id)
      } catch (error) {
        ctx.throw(403, 'token已过期')
      }
      ctx.decoded = decoded
      await next()
    } else {
      ctx.throw(403, '缺少token信息')
    }
  }
}

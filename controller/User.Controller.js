const UserModel = require('../models/User.Model')
const bcrypt = require('../util/bcrypt')

module.exports = {
  async addUser (ctx, next) {
    try {
      const name = 'root'
      const password = 'zy199467'
      let user = await UserModel.findOne({ name })
      if (user) ctx.throw(400, new Error('用户名已被注册'))
      password = bcrypt.encrypt(password)
      user = new UserModel({ name, password })
      await user.save()
    } catch (error) {
      ctx.throw(error)
    } finally {
      await next()
    }
  }
}


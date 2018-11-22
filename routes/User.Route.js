const Router = require('koa-router')
const router = new Router({ prefix: '/user' })
const UserController = require('../controller/User.Controller')
const isAuth = require('../middleware/isAuth')

router.post('/', isAuth(), UserController.addUser)

module.exports = router
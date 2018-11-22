const Router = require('koa-router')
const router = new Router({ prefix: '/user' })
const UserController = require('../controller/User.Controller')

router.post('/', UserController.addUser)

module.exports = router
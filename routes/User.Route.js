const Router = require('koa-router')
const router = new Router({ prefix: '/user' })
const UserController = require('../controller/User.Controller')

router.post('/', UserController.addUser)
router.get('/have', UserController.isHaveUser)

module.exports = router
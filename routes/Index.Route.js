const Router = require('koa-router')
const router = new Router()
const IndexController = require('../controller/Index.Controller')

router.post('/login', IndexController.login)
router.get('/logout', IndexController.logout)

module.exports = router

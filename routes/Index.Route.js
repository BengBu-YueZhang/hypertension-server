const Router = require('koa-router')
const router = new Router()
const IndexController = require('../controller/Index.Controller')
const isAuth = require('../middleware/isAuth')

router.post('/login', IndexController.login)
router.get('/logout', isAuth(), IndexController.logout)

module.exports = router

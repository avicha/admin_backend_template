const Router = require('koa-router')
const loadUser = require('../middlewares/load_user')
const userAuthRequired = require('../middlewares/user_auth_required')
const userController = new(require('../controllers/user'))()
// 用户路由
const userRouter = new Router()
userRouter.post('/sign_in', userController.signIn)
userRouter.post('/sign_up', userController.signUp)
userRouter.get('/current', loadUser, userController.current)
userRouter.put('/logout', userAuthRequired, userController.logout)
userRouter.put('/reset_password', userAuthRequired, userController.resetPassword)
module.exports = userRouter
const Router = require('koa-router')

module.exports = {
  initApp(app) {
    // 用户路由
    const userRouter = new Router()
    userRouter.post('/sign_in', app.controllers.user.signIn)
    userRouter.post('/sign_up', app.controllers.user.signUp)
    userRouter.get('/current', app.middlewares.loadUser, app.controllers.user.current)
    userRouter.put('/logout', app.middlewares.userAuthRequired, app.controllers.user.logout)
    userRouter.put('/reset_password', app.middlewares.userAuthRequired, app.controllers.user.resetPassword)
    return userRouter.routes()
  }
}
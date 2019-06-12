const Router = require('koa-router')
const userRouter = require('./user')

module.exports = {
  initApp(app) {
    const apiRouter = new Router({
      prefix: '/api'
    })
    apiRouter.use('/user', userRouter.initApp(app))
    app.use(app.middlewares.injectCtx)
    app.use(apiRouter.routes())
  }
}
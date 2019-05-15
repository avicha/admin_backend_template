const Router = require('koa-router')
const userRouter = require('./user')

module.exports = {
  initApp(app) {
    const apiRouter = new Router({
      prefix: '/api'
    })
    apiRouter.use('/user', userRouter.routes())
    app.use(apiRouter.routes())
  }
}
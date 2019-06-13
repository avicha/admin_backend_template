const Router = require('koa-router')
const userRouter = require('./user')
const entityRouter = require('./entity')

module.exports = {
  initApp(app) {
    const apiRouter = new Router({
      prefix: '/api'
    })
    apiRouter.use('/user', userRouter.initApp(app))
    apiRouter.use('/entity', app.middlewares.userAuthRequired, entityRouter.initApp(app))
    app.use(apiRouter.routes())
  }
}
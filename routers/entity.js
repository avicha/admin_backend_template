const Router = require('koa-router')

module.exports = {
  initApp(app) {
    // 实体路由
    const entityRouter = new Router()
    entityRouter.all('/:id?', app.middlewares.restfulApi.auto(app.models.Entity))
    entityRouter.put('/:id/restore', app.middlewares.restfulApi.restoreById(app.models.Entity))
    return entityRouter.routes()
  }
}
const koaBody = require('koa-body')
const logger = require('koa-logger')
const { importDirModules } = require('../utils/module')
const middlewares = importDirModules(__dirname, { camelCase: 'little' })

module.exports = {
  ...middlewares,
  initApp(app) {
    //转换post数据为json，file
    app.use(koaBody({
      multipart: true,
      formidable: app.config.formidable
    }))
    //访问日志
    app.use(logger((str, args) => {
      app.loggers.routerLogger.info(str)
    }))
  }
}
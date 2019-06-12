const HttpStatusCode = require('../constants/http_status_code')
const { importDirModules } = require('../utils/module')
const exceptions = importDirModules(__dirname, { camelCase: 'big' })

module.exports = {
  ...exceptions,
  initApp(app) {
    app.use(async function(ctx, next) {
      await next().catch(err => {
        ctx.body = {
          code: err.code || HttpStatusCode.HTTP_INTERNAL_SERVER_ERROR,
          message: err.message
        }
        app.loggers.appLogger.error(ctx.body)
        ctx.app.emit('error', err)
      })
    })
    app.on('error', e => {
      app.loggers.appLogger.error(`APP发生未知应用错误: ${e.stack}`)
    })
  }
}
const mkdirp = require('mkdirp')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const session = require('koa-session')
const redisStore = require('koa-redis')
const jwt = require('jsonwebtoken')
const { importDirModules } = require('../utils/module')
const middlewares = importDirModules(__dirname, { camelCase: 'little' })

module.exports = {
  ...middlewares,
  initApp(app) {
    app.use(middlewares.injectCtx)
    //保证上传目录存在
    mkdirp.sync(app.config.formidable.uploadDir, {
      mode: 0o744
    })
    //转换post数据为json，file
    app.use(koaBody({
      multipart: true,
      formidable: app.config.formidable
    }))
    const sessionConfig = {
      prefix: app.config.session.prefix,
      maxAge: app.config.session.maxAge,
      autoCommit: true,
      overwrite: true,
      rolling: false,
      renew: false,
      externalKey: {
        get(ctx) {
          const token = ctx.headers[app.config.session.tokenKey] || ctx.request.query[app.config.session.tokenKey]
          try {
            if (token) {
              const payload = jwt.verify(token, app.config.server.secretKey)
              return payload.sessionId
            }
          } catch (error) {
            return null
          }
        },
        set(ctx, externalKey) {

        }
      },
      store: redisStore({
        client: app.connections.redis
      })
    }
    app.use(session(sessionConfig, app))
    //访问日志
    app.use(logger((str, args) => {
      app.loggers.routerLogger.info(str)
    }))
  }
}
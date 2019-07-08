const Koa = require('koa')
//配置文件
const config = require('./config')
const connections = require('./connections')
const constants = require('./constants')
const controllers = require('./controllers')
const models = require('./database/models')
const env = require('./env')
const exceptions = require('./exceptions')
const middlewares = require('./middlewares')
const routers = require('./routers')
const schemas = require('./schemas')
const services = require('./services')
const utils = require('./utils')
const loggers = require('./loggers')

//实例化app
const app = new Koa()
app.config = config
app.connections = connections
app.constants = constants
app.controllers = controllers
app.models = models
app.env = env
app.exceptions = exceptions
app.middlewares = middlewares
app.schemas = schemas
app.services = services
app.utils = utils
app.loggers = loggers
//配置app的secret key
app.keys = [config.server.secretKey]
//配置全局中间件
middlewares.initApp(app)
//全局错误捕获处理
exceptions.initApp(app)
//初始化路由系统
routers.initApp(app)
//导出app实例
module.exports = app
if (!module.parent) {
  app.listen(config.server.port)
  loggers.appLogger.info(`app is successful running and listening ${config.server.port} now.`)
}
const Koa = require('koa')
const middlewares = require('./middlewares')
const exceptions = require('./exceptions')
const routers = require('./routers')
//实例化app
const app = new Koa()
//配置文件
const config = require('./config')
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
  console.log(`app is successful running and listening ${config.server.port} now.`)
}
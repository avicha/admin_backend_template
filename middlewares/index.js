const config = require('../config')
const mkdirp = require('mkdirp')
const koaBody = require('koa-body')
const logger = require('koa-logger')
module.exports = {
  initApp(app) {
    //保证上传目录存在
    mkdirp.sync(config.formidable.uploadDir, {
      mode: 0o744
    })
    //转换post数据为json，file
    app.use(koaBody({
      multipart: true,
      formidable: config.formidable
    }))
    //访问日志
    app.use(logger())
  }
}
const HttpStatusCode = require('../constants/http_status_code')

const response = function(code = HttpStatusCode.HTTP_OK, message = 'success', data = {}) {
  this.body = {
    code,
    message,
    data
  }
}
const success = function(result, fields = '') {
  if (fields) {
    if (typeof fields === 'string') {
      fields = fields.split(',')
    }
  }
  if (fields.length) {
    let resResult = {}
    fields.forEach(field => {
      resResult[field] = result[field]
    })
    this.body = {
      code: HttpStatusCode.HTTP_OK,
      message: 'success',
      data: resResult
    }
  } else {
    this.body = {
      code: HttpStatusCode.HTTP_OK,
      message: 'success',
      data: result
    }
  }
}
const successWithList = function(count, rows, fields = '') {
  if (fields) {
    if (typeof fields === 'string') {
      fields = fields.split(',')
    }
  }
  if (fields.length) {
    rows = rows.map(obj => {
      let resObject = {}
      fields.forEach(field => {
        resObject[field] = obj[field]
      })
      return resObject
    })
  }
  this.body = {
    code: HttpStatusCode.HTTP_OK,
    message: 'success',
    data: {
      count: count,
      rows: rows
    }
  }
}
const error = function(code, message) {
  this.loggers.appLogger.error(`APP返回错误码：${code}，错误信息: ${message}`)
  this.body = {
    code,
    message
  }
}
const throws = function(e) {
  this.loggers.appLogger.error(`APP返回业务应用错误，错误码：${e.code}，错误信息: ${e.message}`)
  this.loggers.appLogger.error(e.stack)
  this.body = {
    code: e.code,
    message: e.message
  }
}
module.exports = async (ctx, next) => {
  ctx.success = success.bind(ctx)
  ctx.reply = response.bind(ctx)
  ctx.successWithList = successWithList.bind(ctx)
  ctx.error = error.bind(ctx)
  ctx.throws = throws.bind(ctx)
  const { config, connections, constants, controllers, models, env, exceptions, middlewares, schemas, services, utils, loggers } = ctx.app
  Object.assign(ctx, { config, connections, constants, controllers, models, env, exceptions, middlewares, schemas, services, utils, loggers })
  await next()
}
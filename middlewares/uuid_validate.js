const BaseError = require('../exceptions/base_error')
const HttpStatusCode = require('../constants/http_status_code')

module.exports = async (ctx, next) => {
  if (ctx.params.id) {
    if (/^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(ctx.params.id)) {
      await next()
    } else {
      ctx.throws(new BaseError(HttpStatusCode.HTTP_BAD_REQUEST, '请输入正确格式的id'))
    }
  } else {
    await next()
  }
}
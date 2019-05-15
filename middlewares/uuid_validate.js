const BaseError = require('../exceptions/base_error')
module.exports = async (ctx, next) => {
  if (ctx.params.id) {
    if (/^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(ctx.params.id)) {
      await next()
    } else {
      throw new BaseError(400, '请输入正确格式的id')
    }
  } else {
    await next()
  }
}
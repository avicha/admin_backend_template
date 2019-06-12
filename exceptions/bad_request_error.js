const HttpStatusCode = require('../constants/http_status_code')

class BadRequestError extends Error {
  constructor() {
    super()
    this.code = HttpStatusCode.HTTP_BAD_REQUEST
    this.message = '参数输入不合法，请检查后重新输入'
  }
}
module.exports = BadRequestError
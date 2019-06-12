const {
  USER_TABLE_CODE
} = require('../constants/table_code')
const HttpStatusCode = require('../constants/http_status_code')

class UserNotAuthError extends Error {
  constructor() {
    super()
    this.code = `${HttpStatusCode.HTTP_UNAUTHORIZED}${USER_TABLE_CODE}`
    this.message = '请先登录!'
  }
}
module.exports = UserNotAuthError
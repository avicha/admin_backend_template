const {
  USER_TABLE_CODE
} = require('../constants/table_code')
const HttpStatusCode = require('../constants/http_status_code')

class UserAuthExpiredError extends Error {
  constructor() {
    super()
    this.code = `${HttpStatusCode.HTTP_LOGIN_TIMEOUT}${USER_TABLE_CODE}`
    this.message = '登录超时，请重新登录!'
  }
}
module.exports = UserAuthExpiredError
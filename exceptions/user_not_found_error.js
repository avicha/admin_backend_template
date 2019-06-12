const {
  USER_TABLE_CODE
} = require('../constants/table_code')
const HttpStatusCode = require('../constants/http_status_code')

class UserNotFoundError extends Error {
  constructor(username = '') {
    super()
    this.code = `${HttpStatusCode.HTTP_NOT_FOUND}${USER_TABLE_CODE}`
    this.message = `用户${username}不存在`
  }
}
module.exports = UserNotFoundError
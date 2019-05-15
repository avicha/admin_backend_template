const {
  USER_TABLE_CODE
} = require('../constants/table_code')

class UserNotAuthError extends Error {
  constructor() {
    super()
    this.code = `401${USER_TABLE_CODE}`
    this.message = '请先登录!'
  }
}
module.exports = UserNotAuthError
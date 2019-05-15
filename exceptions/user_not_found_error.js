const {
  USER_TABLE_CODE
} = require('../constants/table_code')

class UserNotFoundError extends Error {
  constructor(username = '') {
    super()
    this.code = `404${USER_TABLE_CODE}`
    this.message = `用户${username}不存在`
  }
}
module.exports = UserNotFoundError
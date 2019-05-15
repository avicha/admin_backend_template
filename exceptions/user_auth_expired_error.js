const {
  USER_TABLE_CODE
} = require('../constants/table_code')

class UserAuthExpiredError extends Error {
  constructor() {
    super()
    this.code = `440${USER_TABLE_CODE}`
    this.message = '登录超时，请重新登录!'
  }
}
module.exports = UserAuthExpiredError
const config = require('../config')
const UserModel = require('../database/models').User

module.exports = async (ctx, next) => {
  let loginUserId = ctx.session.loginUserId
  if (loginUserId) {
    ctx.state.user = await UserModel.findByPk(loginUserId, {
      attributes: { exclude: ['password_hash'] }
    })
    await next()
  } else {
    await next()
  }
}
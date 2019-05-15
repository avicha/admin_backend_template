const config = require('../config')
const UserModel = require('../database/models').User

module.exports = async (ctx, next) => {
  let token = ctx.headers.token || ctx.request.query.token
  if (token) {
    let payload = await UserModel.verifyToken(token)
    if (payload) {
      ctx.state.user = await UserModel.findByPk(payload.user_id, {
        attributes: ['id', 'username', 'nickname', 'avatar', 'phone_number', 'last_login_time']
      })
      await next()
    } else {
      await next()
    }
  } else {
    await next()
  }
}
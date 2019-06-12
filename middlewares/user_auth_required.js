const UserNotAuthError = require('../exceptions/user_not_auth_error')
const loadUser = require('./load_user')
const compose = require('koa-compose')

module.exports = compose([loadUser, async (ctx, next) => {
  if (ctx.state.user) {
    await next()
  } else {
    ctx.throws(new UserNotAuthError())
  }
}])
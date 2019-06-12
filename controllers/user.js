const BaseController = require('./base')
const jwt = require('jsonwebtoken')

module.exports = class UserController extends BaseController {
  async signIn(ctx) {
    const username = ctx.request.body.username
    const password = ctx.request.body.password
    const user = await ctx.models.User.validateUser(username, password)
    await user.update({
      last_login_time: user.updated_at
    })
    let token = jwt.sign({
      user_id: user.id
    }, ctx.config.server.secretKey, {
      expiresIn: 2 * 60 * 60
    })
    return ctx.success({ token })
  }
  async signUp(ctx) {

  }
  async current(ctx) {
    return ctx.success(ctx.state.user)
  }
  async logout(ctx) {
    return ctx.success()
  }
  async resetPassword(ctx) {
    let old_password = ctx.request.body.old_password
    let new_password = ctx.request.body.new_password
    const user = await ctx.models.User.validateUser(ctx.state.user.username, old_password)
    await user.update({
      password_hash: ctx.models.User.cryptoPassword(new_password)
    })
    return ctx.success()
  }
}
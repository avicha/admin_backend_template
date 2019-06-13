const BaseController = require('./base')
const jwt = require('jsonwebtoken')

module.exports = class UserController extends BaseController {
  async signIn(ctx) {
    const username = ctx.request.body.username
    const password = ctx.request.body.password
    const user = await ctx.models.User.validateUser(username, password)
    ctx.session.loginUserId = user.id
    let token = jwt.sign({ sessionId: ctx.session._sessCtx.externalKey }, ctx.config.server.secretKey)
    return ctx.success({ token })
  }
  async signUp(ctx) {

  }
  async current(ctx) {
    return ctx.success(ctx.state.user)
  }
  async logout(ctx) {
    ctx.session = null
    return ctx.success()
  }
  async resetPassword(ctx) {
    let oldPassword = ctx.request.body.oldPassword
    let newPassword = ctx.request.body.newPassword
    const user = await ctx.models.User.validateUser(ctx.state.user.username, oldPassword)
    await user.update({
      password_hash: ctx.models.User.cryptoPassword(newPassword)
    })
    return ctx.success()
  }
}
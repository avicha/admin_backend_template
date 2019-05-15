const BaseController = require('./base')
const UserModel = require('../database/models').User
const config = require('../config')
const jwt = require('jsonwebtoken')

module.exports = class UserController extends BaseController {
  async signIn(ctx) {
    const username = ctx.request.body.username
    const password = ctx.request.body.password
    const user = await UserModel.validateUser(username, password)
    await user.update({
      last_login_time: user.updated_at
    })
    let token = jwt.sign({
      user_id: user.id
    }, config.server.secretKey, {
      expiresIn: 2 * 60 * 60
    })
    return ctx.body = super.successWithResult({
      token
    })
  }
  async signUp(ctx) {

  }
  async current(ctx) {
    return ctx.body = super.successWithResult(ctx.state.user)
  }
  async logout(ctx) {
    return ctx.body = super.success()
  }
  async resetPassword(ctx) {
    let old_password = ctx.request.body.old_password
    let new_password = ctx.request.body.new_password
    const user = await UserModel.validateUser(ctx.state.user.username, old_password)
    await user.update({
      password_hash: UserModel.cryptoPassword(new_password)
    })
    return ctx.body = super.success()
  }
}
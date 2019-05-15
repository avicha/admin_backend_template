const BaseModel = require('./base')
const bcrypt = require('bcryptjs')
const config = require('../../config')
const jwt = require('jsonwebtoken')
const {
  USER_TABLE_CODE
} = require('../../constants/table_code')
const UserPasswordError = require('../../exceptions/user_password_error')
const UserNotAuthError = require('../../exceptions/user_not_auth_error')
const UserNotFoundError = require('../../exceptions/user_not_found_error')
const UserAuthExpiredError = require('../../exceptions/user_auth_expired_error')

module.exports = (sequelize, DataTypes) => {
  class UserModel extends BaseModel {
    static cryptoPassword(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }
    static async validateUser(username, password) {
      let user = await UserModel.findOne({
        where: {
          username
        }
      })
      if (user) {
        let match = bcrypt.compareSync(password, user.password_hash)
        if (match) {
          return user
        } else {
          throw new UserPasswordError()
        }
      } else {
        throw new UserNotFoundError(username)
      }
    }
    static verifyToken(token) {
      return new Promise((resolve, reject) => {
        jwt.verify(token, config.server.secretKey, (error, payload) => {
          if (error) {
            switch (error.name) {
              case 'TokenExpiredError':
                reject(new UserAuthExpiredError())
              default:
                reject(new UserNotAuthError())
            }
          } else {
            resolve(payload)
          }
        })
      })
    }
    static get TABLE_CODE() {
      return USER_TABLE_CODE
    }
  }
  UserModel.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    register_type: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
      allowNull: false
    },
    last_login_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    indexes: [{
      unique: true,
      fields: ['username']
    }]
  })
  return UserModel
}
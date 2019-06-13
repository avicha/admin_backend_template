const BaseModel = require('./base')
const bcrypt = require('bcryptjs')
const {
  USER_TABLE_CODE
} = require('../../constants/table_code')
const UserRegisterType = require('../../constants/user_register_type')
const UserPasswordError = require('../../exceptions/user_password_error')
const UserNotFoundError = require('../../exceptions/user_not_found_error')

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
    static get TABLE_CODE() {
      return USER_TABLE_CODE
    }
  }
  UserModel.init({
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      comment: '用户名称'
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '密码hash'
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '头像URL'
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '昵称'
    },
    phone_number: {
      type: DataTypes.STRING(11),
      allowNull: true,
      comment: '手机号码'
    },
    register_type: {
      type: DataTypes.SMALLINT,
      defaultValue: UserRegisterType.USERNAME,
      allowNull: false,
      comment: '注册类型，1为用户名注册，2为手机号码注册，3为邮箱注册，4为微信注册'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    comment: '用户表',
    indexes: [{
      unique: true,
      fields: ['username']
    }]
  })
  return UserModel
}
'use strict';

const userRegisterType = require('../../constants/user_register_type')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const DataTypes = Sequelize.DataTypes
    return queryInterface.createTable('user', {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        comment: '主键ID'
      },
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
        defaultValue: userRegisterType.USERNAME,
        allowNull: false,
        comment: '注册类型，1为用户名注册，2为手机号码注册，3为邮箱注册，4为微信注册'
      },
      last_login_time: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '上次登录时间'
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
    }, {
      comment: '用户表'
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user')
  }
}
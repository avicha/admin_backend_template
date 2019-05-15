'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      const DataTypes = Sequelize.DataTypes
      return queryInterface.createTable('user', {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
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
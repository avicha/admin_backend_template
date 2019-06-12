'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const DataTypes = Sequelize.DataTypes
    return queryInterface.createTable('entity', {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        comment: '主键ID'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '实体名称'
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false,
        comment: '实体描述'
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
      comment: '实体表'
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('entity')
  }
};
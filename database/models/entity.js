const BaseModel = require('./base')
const {
  ENTITY_TABLE_CODE
} = require('../../constants/table_code')

module.exports = (sequelize, DataTypes) => {
  class EntityModel extends BaseModel {
    static get TABLE_CODE() {
      return ENTITY_TABLE_CODE
    }
  }
  EntityModel.init({
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
    }
  }, {
    sequelize,
    modelName: 'Entity',
    tableName: 'entity',
    comment: '实体表'
  })
  return EntityModel
}
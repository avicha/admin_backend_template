const db = require('../database/models')
const { pgLogger } = require('../loggers')

/**
 * 通过ID查找model
 *
 * @param  { Model } model 模型
 * @param  { uuid } modelId 模型主键
 * @param  { [string] } attributes 查找属性
 * @param  { [string] } include 包含属性 
 * @param  { Boolean } paranoid 是否查找删掉的元素
 * @return { model } 模型实例
 */
const findById = async (model, modelId, {
  attributes,
  include,
  paranoid = true
}) => {
  const options = {}
  if (attributes) {
    options.attributes = attributes
  }
  if (include) {
    options.include = include.map(association => ({
      association
    }))
  }
  //查找属于该用户的模型
  options.where = {
    id: modelId
  }
  options.paranoid = !!paranoid
  pgLogger.debug(model, 'findOne options:', options)
  const modelObject = await model.findOne(options)
  if (modelObject) {
    return modelObject
  } else {
    throw model.notFoundError(modelId)
  }
}
/**
 * 查找model列表
 *
 * @param  { Model } model 模型
 * @param  { uuid } modelId 模型主键
 * @param  { [string] } attributes 查找属性
 * @param  { [string] } include 包含属性 
 * @param  { number } offset 查找偏移量
 * @param  { number } limit 查找数量
 * @param  { number } page 查找页码，从1开始
 * @param  { Boolean } paranoid 是否查找删掉的元素
 * @param  { string } order 排序
 * @param  { object } filter 查询条件
 * @return { model } 模型实例
 */
const list = async (model, {
  attributes,
  include,
  offset = 0,
  limit = 12,
  page = 1,
  paranoid = true,
  order,
  ...filter
}) => {
  const options = {}
  //如果没有偏移量，但传入了页码，则计算偏移量
  if (!offset && page) {
    offset = (page - 1) * limit
  }
  options.offset = offset
  //控制最大查找数量不超过12
  options.limit = Math.min(limit, 12)
  //处理排序，用逗号分隔，-前缀表示降序
  if (order) {
    options.order = order.map(field => {
      let direction = 'asc'
      if (field.startsWith('-')) {
        field = field.substring(1)
        direction = 'desc'
      }
      return [field, direction]
    })
  }
  //查询条件限制用户所有者
  options.where = filter
  if (attributes) {
    options.attributes = attributes
  }
  if (include) {
    options.include = include.map(association => ({
      association
    }))
  }
  options.paranoid = !!paranoid
  pgLogger.debug(model, 'findAndCountAll options:', options)
  const result = await model.findAndCountAll(options)
  return result
}
/**
 * @param  { Model } model 模型
 * @param  { object } object 创建数据
 * @return { model } 新建模型实例
 */
const create = async (model, object) => {
  const modelObject = await model.create(object)
  return modelObject
}
/**
 * @param  { Model } model 模型
 * @param  { uuid } modelId 模型主键
 * @param  { object } object 更新数据
 * @return { model } 被更新模型实例
 */
const updateById = async (model, modelId, object) => {
  return db.sequelize.transaction(async t => {
    const modelObject = await model.findOne({
      where: {
        id: modelId
      },
      transaction: t
    })
    if (modelObject) {
      await modelObject.update(object, { transaction: t })
      return modelObject
    } else {
      throw model.notFoundError(modelId)
    }
  })
}
/**
 * @param  { Model } model 模型
 * @param  { uuid } modelId 模型主键
 * @return { model } 被删除模型实例
 */
const removeById = async (model, modelId) => {
  return db.sequelize.transaction(async t => {
    const modelObject = await model.findOne({
      where: {
        id: modelId
      },
      transaction: t
    })
    if (modelObject) {
      await modelObject.destroy({ transaction: t })
      return modelObject
    } else {
      throw model.notFoundError(modelId)
    }
  })
}
/**
 * @param  { Model } model 模型
 * @param  { uuid } modelId 模型主键
 * @return { model } 被恢复模型实例
 */
const restoreById = async (model, modelId) => {
  return db.sequelize.transaction(async t => {
    //找到需要恢复的对象
    const modelObject = await model.findOne({
      where: {
        id: modelId
      },
      paranoid: false,
      transaction: t
    })
    if (modelObject) {
      await modelObject.restore({
        transaction: t
      })
      return modelObject
    } else {
      throw model.notFoundError(modelId)
    }
  })
}
module.exports = {
  findById,
  list,
  create,
  updateById,
  removeById,
  restoreById
}
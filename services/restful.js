const findById = async (model, modelId, {
  attributes,
  include
}) => {
  const options = {}
  if (attributes) {
    options.attributes = attributes.split(',')
  }
  if (include) {
    options.include = include.split(',').map(association => ({
      association
    }))
  }
  const modelObject = await model.findByPk(modelId, options)
  if (modelObject) {
    return modelObject
  } else {
    throw model.notFoundError(modelId)
  }
}
const list = async (model, {
  attributes,
  include,
  offset = 0,
  limit = 12,
  page = 1,
  order,
  ...filter
}) => {
  const options = {}
  if (!offset && page) {
    offset = (page - 1) * limit
  }
  options.offset = offset
  options.limit = Math.min(limit, 12)
  if (order) {
    options.order = order.split(',').map(field => {
      let direction = 'asc'
      if (field.startsWith('-')) {
        field = field.substring(1)
        direction = 'desc'
      }
      return [field, direction]
    })
  }
  options.where = filter
  console.debug(model, 'findAndCountAll options:', options)
  if (attributes) {
    options.attributes = attributes.split(',')
  }
  if (include) {
    options.include = include.split(',').map(association => ({
      association
    }))
  }
  const result = await model.findAndCountAll(options)
  return result
}
const create = async (model, object) => {
  const modelObject = await model.create(object)
  return modelObject
}
const updateById = async (model, modelId, object) => {
  const modelObject = await model.findByPk(modelId)
  if (modelObject) {
    await modelObject.update(object)
    return modelObject
  } else {
    throw model.notFoundError(modelId)
  }
}
const removeById = async (model, modelId) => {
  const modelObject = await model.findByPk(modelId)
  if (modelObject) {
    await modelObject.destroy()
    return modelObject
  } else {
    throw model.notFoundError(modelId)
  }
}
module.exports = {
  findById,
  list,
  create,
  updateById,
  removeById
}
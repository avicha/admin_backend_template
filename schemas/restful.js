const Joi = require('@hapi/joi')

//扩展Joi，用来处理逗号分隔的数组
const string2arrayJoi = Joi.extend({
  name: 'string2array',
  base: Joi.array(),
  coerce(value, state, options) {
    if (value) {
      if (value instanceof Array) {
        return value
      } else {
        return value.split(',')
      }
    } else {
      return undefined
    }
  }
})
//获取的参数验证
const getSchema = Joi.object().keys({
  attributes: string2arrayJoi.string2array().items(Joi.string()),
  include: string2arrayJoi.string2array().items(Joi.string()),
  paranoid: Joi.boolean()
})
//列表的参数验证
const listSchema = Joi.object().keys({
  attributes: string2arrayJoi.string2array().items(Joi.string()),
  include: string2arrayJoi.string2array().items(Joi.string()),
  offset: Joi.number(),
  limit: Joi.number().max(12),
  page: Joi.number(),
  paranoid: Joi.boolean(),
  order: string2arrayJoi.string2array().items(Joi.string())
})
//创建的参数验证
const createSchema = Joi.object().keys({
  id: Joi.strip(),
  created_at: Joi.strip(),
  updated_at: Joi.strip(),
  deleted_at: Joi.strip()
})
//更新的参数验证
const updateSchema = Joi.object().keys({
  id: Joi.strip(),
  created_at: Joi.strip(),
  updated_at: Joi.strip(),
  deleted_at: Joi.strip()
})
module.exports = {
  getSchema,
  listSchema,
  createSchema,
  updateSchema
}
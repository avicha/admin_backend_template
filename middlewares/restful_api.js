const UUIDValidate = require('./uuid_validate')
const compose = require('koa-compose')
const {
  findById,
  list,
  create,
  updateById,
  removeById
} = require('../services/restful')
module.exports = {
  auto: function (model, allowedMethods = ['get', 'list', 'create', 'update', 'remove']) {
    return compose([UUIDValidate, async (ctx, next) => {
      const modelId = ctx.params.id
      const options = {}
      let result
      switch (ctx.method.toUpperCase()) {
      case 'GET':
        if (modelId) {
          if (allowedMethods.includes('get')) {
            result = await findById(model, modelId, ctx.request.query)
          }
        } else {
          if (allowedMethods.includes('list')) {
            result = await list(model, ctx.request.query)
          }
        }
        break
      case 'POST':
        if (allowedMethods.includes('create')) {
          const createdObject = await create(model, ctx.request.body)
          if (ctx.request.query.returning) {
            result = createdObject
          } else {
            result = {
              id: createdObject.id,
              created_at: createdObject.created_at
            }
          }
        }
        break
      case 'PUT':
        if (allowedMethods.includes('update')) {
          const updatedObject = await updateById(model, modelId, ctx.request.body)
          result = deletedObject.updated_at
        }
        break
      case 'DELETE':
        if (allowedMethods.includes('remove')) {
          const deletedObject = await removeById(model, modelId)
          result = deletedObject.deleted_at
        }
        break
      }
      if (result) {
        return ctx.body = {
          code: 200,
          message: 'success',
          data: result
        }
      } else {
        await next()
      }
    }])
  },
  findById: function (model) {
    return compose([UUIDValidate, async (ctx, next) => {
      const modelId = ctx.params.id
      const result = await findById(model, modelId, ctx.request.query)
      const instanceName = model.name.charAt(0).toLowerCase() + model.name.substring(1)
      ctx.state[instanceName] = result
      await next()
    }])
  },
  list: function (model) {
    return async (ctx, next) => {
      const result = await list(model, ctx.request.query)
      const instanceName = model.name.charAt(0).toLowerCase() + model.name.substring(1)
      ctx.state[`${instanceName}List`] = result
      await next()
    }
  },
  create: function (model) {
    return async (ctx, next) => {
      const result = await create(model, ctx.request.body)
      const instanceName = model.name.charAt(0).toLowerCase() + model.name.substring(1)
      ctx.state[instanceName] = result
      await next()
    }
  },
  updateById: function (model) {
    return compose([UUIDValidate, async (ctx, next) => {
      const modelId = ctx.params.id
      const result = await updateById(model, modelId, ctx.request.body)
      ctx.state[`updated${model.name}`] = result
      await next()
    }])
  },
  removeById: function (model) {
    return compose([UUIDValidate, async (ctx, next) => {
      const modelId = ctx.params.id
      const result = await removeById(model, modelId)
      ctx.state[`deleted${model.name}`] = result
      await next()
    }])
  }
}
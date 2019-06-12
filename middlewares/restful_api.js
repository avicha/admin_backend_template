const UUIDValidate = require('./uuid_validate')
const SchemaValidate = require('./schema_validate')
const compose = require('koa-compose')
const HttpStatusCode = require('../constants/http_status_code')
const restfulSchema = require('../schemas/restful')
const restfulService = require('../services/restful')
const { appLogger } = require('../loggers')

const auto = (model, allowedMethods = ['get', 'list', 'create', 'update', 'remove']) => {
  //如果传入的单个允许方法，把字符串变成数组方便统一处理
  if (typeof allowedMethods === 'string') {
    allowedMethods = [allowedMethods]
  }
  return async (ctx, next) => {
    //模型ID
    const modelId = ctx.params.id
    //根据restful规范，分别调用增删查改列表的各自实现
    switch (ctx.method.toUpperCase()) {
      case 'GET':
        if (modelId) {
          if (allowedMethods.includes('get')) {
            return findById(model)(ctx, next)
          }
        } else {
          if (allowedMethods.includes('list')) {
            return list(model)(ctx, next)
          }
        }
        break
      case 'POST':
        if (allowedMethods.includes('create')) {
          return create(model)(ctx, next)
        }
        break
      case 'PUT':
        if (allowedMethods.includes('update')) {
          return updateById(model)(ctx, next)
        }
        break
      case 'DELETE':
        if (allowedMethods.includes('remove')) {
          return removeById(model)(ctx, next)
        }
        break
    }
    await next()
  }
}
const findById = (model, returning = true) => {
  return compose([UUIDValidate, SchemaValidate(restfulSchema.getSchema, 'query'), async (ctx, next) => {
    const modelId = ctx.params.id
    try {
      const result = await restfulService.findById(model, modelId, ctx.state.inputParams)
      if (returning) {
        return ctx.body = {
          code: HttpStatusCode.HTTP_OK,
          message: 'success',
          data: result
        }
      } else {
        const instanceName = model.name.charAt(0).toLowerCase() + model.name.substring(1)
        ctx.state[instanceName] = result
        await next()
      }
    } catch (e) {
      ctx.throws(e)
    }
  }])
}
const list = (model, returning = true) => {
  return compose([SchemaValidate(restfulSchema.listSchema, 'query', {
    allowUnknown: true,
    stripUnknown: false
  }), async (ctx, next) => {
    try {
      const result = await restfulService.list(model, ctx.state.inputParams)
      if (returning) {
        return ctx.body = {
          code: HttpStatusCode.HTTP_OK,
          message: 'success',
          data: result
        }
      } else {
        const instanceName = model.name.charAt(0).toLowerCase() + model.name.substring(1)
        ctx.state[`${instanceName}List`] = result
        await next()
      }
    } catch (e) {
      ctx.throws(e)
    }
  }])
}
const create = (model, returning = true) => {
  return compose([SchemaValidate(restfulSchema.createSchema, 'body', {
    allowUnknown: true,
    stripUnknown: false
  }), async (ctx, next) => {
    try {
      const result = await restfulService.create(model, ctx.state.inputParams)
      if (returning) {
        return ctx.body = {
          code: HttpStatusCode.HTTP_CREATED,
          message: 'success',
          data: result
        }
      } else {
        const instanceName = model.name.charAt(0).toLowerCase() + model.name.substring(1)
        ctx.state[instanceName] = result
        await next()
      }
    } catch (e) {
      ctx.throws(e)
    }
  }])
}
const updateById = (model, returning = true) => {
  return compose([UUIDValidate, SchemaValidate(restfulSchema.updateSchema, 'body', {
    allowUnknown: true,
    stripUnknown: false
  }), async (ctx, next) => {
    const modelId = ctx.params.id
    try {
      const result = await restfulService.updateById(model, modelId, ctx.state.inputParams)
      if (returning) {
        return ctx.body = {
          code: HttpStatusCode.HTTP_OK,
          message: 'success',
          data: {
            updated_at: result.updated_at
          }
        }
      } else {
        ctx.state[`updated${model.name}`] = result
        await next()
      }
    } catch (e) {
      ctx.throws(e)
    }
  }])
}
const removeById = (model, returning = true) => {
  return compose([UUIDValidate, async (ctx, next) => {
    const modelId = ctx.params.id
    try {
      const result = await restfulService.removeById(model, modelId)
      if (returning) {
        return ctx.body = {
          code: HttpStatusCode.HTTP_OK,
          message: 'success',
          data: {
            deleted_at: result.deleted_at
          }
        }
      } else {
        ctx.state[`deleted${model.name}`] = result
        await next()
      }
    } catch (e) {
      ctx.throws(e)
    }
  }])
}
const restoreById = (model, returning = true) => {
  return compose([UUIDValidate, async (ctx, next) => {
    const modelId = ctx.params.id
    try {
      const result = await restfulService.restoreById(model, modelId)
      if (returning) {
        return ctx.body = {
          code: HttpStatusCode.HTTP_OK,
          message: 'success',
          data: {
            updated_at: result.updated_at
          }
        }
      } else {
        ctx.state[`restored${model.name}`] = result
        await next()
      }
    } catch (e) {
      ctx.throws(e)
    }
  }])
}
module.exports = {
  auto,
  findById,
  list,
  create,
  updateById,
  removeById,
  restoreById
}
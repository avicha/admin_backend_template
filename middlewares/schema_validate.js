const Joi = require('@hapi/joi')
const BadRequestError = require('../exceptions/bad_request_error')
const { appLogger } = require('../loggers')

module.exports = function(schema, part, options = {}) {
  return async (ctx, next) => {
    let inputParams
    switch (part) {
      case 'query':
        inputParams = ctx.request.query
        break
      case 'params':
        inputParams = ctx.params
        break
      case 'body':
        inputParams = ctx.request.body
        break
    }
    const {
      error,
      value
    } = Joi.validate(inputParams, schema, Object.assign({
      abortEarly: true,
      convert: true,
      allowUnknown: false,
      skipFunctions: false,
      stripUnknown: true,
      presence: 'optional',
      noDefaults: false,
      escapeHtml: false
    }, options))
    if (error) {
      appLogger.error(`schema validate ${part} error ${error}, inputParams`, inputParams)
      ctx.throws(new BadRequestError())
    } else {
      ctx.state.inputParams = value
      await next()
    }
  }
}
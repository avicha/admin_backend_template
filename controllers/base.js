module.exports = class BaseController {
  dispatch(e) {
    e.emit('event')
  }
  response(code = 200, message = 'success', data = {}) {
    return {
      code,
      message,
      data
    }
  }
  successWithResult(result, fields = '') {
    if (fields) {
      if (typeof fields === 'string') {
        fields = fields.split(',')
      }
    }
    if (fields.length) {
      let resResult = {}
      fields.forEach(field => {
        resResult[field] = result[field]
      })
      return {
        code: 200,
        message: 'success',
        data: resResult
      }
    } else {
      return {
        code: 200,
        message: 'success',
        data: result
      }
    }
  }
  success() {
    return {
      code: 200,
      message: 'success',
      data: {}
    }
  }
  successWithListResult(totalRows, result, fields = '') {
    if (fields) {
      if (typeof fields === 'string') {
        fields = fields.split(',')
      }
    }
    if (fields.length) {
      result = result.map(obj => {
        let resObject = {}
        fields.forEach(field => {
          resObject[field] = obj[field]
        })
        return resObject
      })
    }
    return {
      code: 200,
      message: 'success',
      data: {
        count: totalRows,
        rows: result
      }
    }
  }
  errorWithMessage(code, message) {
    return {
      code,
      message
    }
  }
}
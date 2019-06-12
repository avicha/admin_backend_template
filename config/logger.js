const env = require('../env')
const path = require('path')

module.exports = {
  base: env.LOGGER_BASE || path.resolve('logs'),
  maxLogSize: env.LOGGER_MAX_LOG_SIZE ? parseInt(env.LOGGER_MAX_LOG_SIZE) : 2 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
  daysToKeep: env.LOGGER_DAYS_TO_KEEP ? parseInt(env.LOGGER_DAYS_TO_KEEP) : 30,
  defaultLevel: env.LOGGER_DEFAULT_LEVEL || 'debug',
  appLevel: env.LOGGER_APP_LEVEL || 'debug',
  redisLevel: env.LOGGER_REDIS_LEVEL || 'debug',
  postgresLevel: env.LOGGER_POSTGRES_LEVEL || 'debug'
}
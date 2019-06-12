const Redis = require('ioredis')
const redisConfig = require('../config').redis
const { redisLogger } = require('../loggers')

const redisConnection = (() => {
  let url = `redis://${redisConfig.auth?(redisConfig.auth.user+':'+redisConfig.auth.pwd+'@'):''}${redisConfig.host}:${redisConfig.port}/${redisConfig.database}`
  redisLogger.info(`redisConnection: redis://${redisConfig.auth?(redisConfig.auth.user+':###@'):''}${redisConfig.host}:${redisConfig.port}/${redisConfig.database}`)
  return new Redis(url, redisConfig.options)
})()
module.exports = redisConnection
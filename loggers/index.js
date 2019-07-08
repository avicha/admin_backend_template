const log4js = require('log4js')
const path = require('path')
const mkdirp = require('mkdirp')
const loggerConfig = require('../config/logger')
//保证日志目录存在
mkdirp.sync(loggerConfig.base, {
  mode: 0o744
})
const layout = {
  type: 'pattern',
  pattern: '%[[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] %c%] %m (%f:%l:%o)'
}
log4js.configure({
  appenders: {
    console: { type: 'console', layout },
    multiFile: { type: 'multiFile', layout, base: loggerConfig.base, property: 'level', extension: '.log', maxLogSize: loggerConfig.maxLogSize, pattern: 'yyyy-MM-dd', daysToKeep: loggerConfig.daysToKeep, compress: false, keepFileExt: true },
    file: { type: 'file', layout, filename: path.join(loggerConfig.base, 'app.log'), maxLogSize: loggerConfig.maxLogSize, pattern: 'yyyy-MM-dd', daysToKeep: loggerConfig.daysToKeep, compress: false, keepFileExt: true }
  },
  categories: {
    default: {
      appenders: ['console', 'multiFile', 'file'],
      level: loggerConfig.defaultLevel,
      enableCallStack: false
    },
    app: {
      appenders: ['console', 'multiFile', 'file'],
      level: loggerConfig.appLevel,
      enableCallStack: true
    },
    redis: {
      appenders: ['console', 'multiFile', 'file'],
      level: loggerConfig.redisLevel,
      enableCallStack: true
    },
    postgres: {
      appenders: ['console', 'multiFile', 'file'],
      level: loggerConfig.postgresLevel,
      enableCallStack: true
    }
  }
})
module.exports = {
  defaultLogger: log4js.getLogger(),
  routerLogger: log4js.getLogger('router'),
  appLogger: log4js.getLogger('app'),
  pgLogger: log4js.getLogger('postgres'),
  redisLogger: log4js.getLogger('redis')
}
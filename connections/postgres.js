const Sequelize = require('sequelize')
const postgresConfig = require('../config').postgres
const { pgLogger } = require('../loggers')

const postgresConnection = (() => {
  let url = `postgres://${postgresConfig.auth?(postgresConfig.auth.user+':'+postgresConfig.auth.pwd+'@'):''}${postgresConfig.host}:${postgresConfig.port}/${postgresConfig.database}`
  pgLogger.info(`postgresConnection: postgres://${postgresConfig.auth?(postgresConfig.auth.user+':***@'):''}${postgresConfig.host}:${postgresConfig.port}/${postgresConfig.database}`)
  return new Sequelize(url, postgresConfig.options)
})()
module.exports = postgresConnection
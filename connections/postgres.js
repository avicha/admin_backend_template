const Sequelize = require('sequelize')
const postgresConfig = require('../config').postgres

const postgresConnection = (() => {
  let url = `postgres://${postgresConfig.auth?(postgresConfig.auth.user+':'+postgresConfig.auth.pwd+'@'):''}${postgresConfig.host}:${postgresConfig.port}/${postgresConfig.database}`
  return new Sequelize(url, postgresConfig.options)
})()
module.exports = {
  postgresConnection
}
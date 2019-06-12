const env = require('../env')
const { pgLogger } = require('../loggers')

module.exports = {
  // with database, username, and password
  auth: (env.POSTGRES_AUTH_USER && env.POSTGRES_AUTH_PWD) ? {
    user: env.POSTGRES_AUTH_USER,
    pwd: env.POSTGRES_AUTH_PWD
  } : null,
  // with database
  database: env.POSTGRES_DATABASE || 'postgres',
  // with uri
  host: env.POSTGRES_HOST || '127.0.0.1',
  port: env.POSTGRES_PORT || 5432,
  options: {
    pool: {
      // Maximum number of connection in pool
      max: env.POSTGRES_OPTIONS_POOL_MAX ? parseInt(env.POSTGRES_OPTIONS_POOL_MAX) : 5,
      // Minimum number of connection in pool
      min: env.POSTGRES_OPTIONS_POOL_MIN ? parseInt(env.POSTGRES_OPTIONS_POOL_MIN) : 1,
      // The maximum time, in milliseconds, that a connection can be idle before being released.
      idle: env.POSTGRES_OPTIONS_POOL_IDLE ? parseInt(env.POSTGRES_OPTIONS_POOL_IDLE) : 10000,
      // The maximum time, in milliseconds, that pool will try to get connection before throwing error
      acquire: env.POSTGRES_OPTIONS_POOL_ACQUIRE ? parseInt(env.POSTGRES_OPTIONS_POOL_ACQUIRE) : 60000
    },
    retry: {
      // How many times a failing query is automatically retried. Set to 0 to disable retrying on SQL_BUSY error.
      max: 3
    },
    logging: env.DEBUG == 'true' ? pgLogger.debug : false,
    benchmark: true
  }
}
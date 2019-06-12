const config = require('../config')
module.exports = {
  "development": {
    "username": config.postgres.auth.user,
    "password": config.postgres.auth.pwd,
    "database": config.postgres.database,
    "host": config.postgres.host,
    "port": config.postgres.port,
    "dialect": "postgres",
    "migrationStorage": "sequelize",
    "seederStorage": "sequelize"
  },
  "test": {
    "username": config.postgres.auth.user,
    "password": config.postgres.auth.pwd,
    "database": config.postgres.database,
    "host": config.postgres.host,
    "port": config.postgres.port,
    "dialect": "postgres",
    "migrationStorage": "sequelize",
    "seederStorage": "sequelize"
  },
  "production": {
    "username": config.postgres.auth.user,
    "password": config.postgres.auth.pwd,
    "database": config.postgres.database,
    "host": config.postgres.host,
    "port": config.postgres.port,
    "dialect": "postgres",
    "migrationStorage": "sequelize",
    "seederStorage": "sequelize"
  }
}
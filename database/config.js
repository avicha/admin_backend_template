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
    "seederStorage": "sequelize",
    "migrationStorageTableName": "sequelize_meta",
    "seederStorageTableName": "sequelize_data"
  },
  "test": {
    "username": config.postgres.auth.user,
    "password": config.postgres.auth.pwd,
    "database": config.postgres.database,
    "host": config.postgres.host,
    "port": config.postgres.port,
    "dialect": "postgres",
    "migrationStorage": "sequelize",
    "seederStorage": "sequelize",
    "migrationStorageTableName": "sequelize_meta",
    "seederStorageTableName": "sequelize_data"
  },
  "production": {
    "username": config.postgres.auth.user,
    "password": config.postgres.auth.pwd,
    "database": config.postgres.database,
    "host": config.postgres.host,
    "port": config.postgres.port,
    "dialect": "postgres",
    "migrationStorage": "sequelize",
    "seederStorage": "sequelize",
    "migrationStorageTableName": "sequelize_meta",
    "seederStorageTableName": "sequelize_data"
  }
}
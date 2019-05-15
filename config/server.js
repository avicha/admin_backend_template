const env = require('../env')
module.exports = {
  host: env.SERVER_HOST || '127.0.0.1',
  port: env.SERVER_PORT ? parseInt(env.SERVER_PORT) : 16000,
  secretKey: env.SERVER_SECRET_KEY || 'secret_key'
}
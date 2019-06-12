const { importDirModules } = require('../utils/module')
module.exports = importDirModules(__dirname, { camelCase: 'little' })
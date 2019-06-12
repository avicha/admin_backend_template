const { importDirModules, bindThis } = require('../utils/module')

const controllers = importDirModules(__dirname, {
  allowExtensions: ['.js'],
  blackList: ['index.js', 'base.js'],
  camelCase: 'little'
})
for (const controllerName in controllers) {
  const controllerClass = controllers[controllerName]
  const controller = bindThis(new controllerClass())
  controllers[controllerName] = controller
}
module.exports = controllers
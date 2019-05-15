const fs = require('fs')
const path = require('path')
const files = fs.readdirSync(__dirname).filter(filename => {
  // 不加载index.js
  return filename.endsWith('.js') && !['index.js'].includes(filename)
})
const modules = {}
for (let file of files) {
  const moduleName = path.basename(file, path.extname(file))
  modules[moduleName] = require(path.join(__dirname, file))
}
module.exports = modules
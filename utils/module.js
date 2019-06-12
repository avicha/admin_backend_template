const fs = require('fs')
const path = require('path')

const importDirModules = (dir, opts = {}) => {
  let defaultOpts = { allowExtensions: ['.js', '.json'], blackList: ['index.js'], camelCase: false }
  const { allowExtensions, blackList, camelCase } = Object.assign(defaultOpts, opts)
  const files = fs.readdirSync(dir).filter(filename => {
    const extname = path.extname(filename)
    if (allowExtensions.length && !allowExtensions.includes(extname)) {
      return false
    }
    if (blackList.length && blackList.includes(filename)) {
      return false
    }
    return true
  })
  const modules = {}
  for (let file of files) {
    let moduleName = path.basename(file, path.extname(file))
    const requiredModule = require(path.join(dir, file))
    if (camelCase) {
      switch (camelCase) {
        case 'little':
          moduleName = moduleName.replace(/[-_](\w)/g, (match, letter) => { return letter.toUpperCase() })
          break
        case 'big':
          moduleName = moduleName.replace(/[-_](\w)/g, (match, letter) => letter.toUpperCase()).replace(/^(\w)/g, (match, letter) => letter.toUpperCase())
          break
      }
    }
    modules[moduleName] = requiredModule
  }
  return modules
}
const bindThis = (target) => {
  const cache = new WeakMap()
  const handler = {
    get(target, key) {
      const value = Reflect.get(target, key)
      if (typeof value !== 'function') {
        return value
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target))
      }
      return cache.get(value)
    }
  }
  const proxy = new Proxy(target, handler)
  return proxy
}
module.exports = {
  importDirModules,
  bindThis
}
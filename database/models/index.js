const Sequelize = require('sequelize')
const {
  postgresConnection
} = require('../../connections/postgres')
const fs = require('fs')

const db = {}
fs.readdirSync(__dirname).filter(filename => {
  // 不加载index.js
  return filename.endsWith('.js') && !['index.js', 'base.js'].includes(filename)
}).forEach(filename => {
  const model = postgresConnection.import(`${__dirname}/${filename}`)
  db[model.name] = model
})
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})
db.sequelize = postgresConnection
db.Sequelize = Sequelize
module.exports = db
'use strict';
const uuidv4 = require('uuid/v4')
const UserModel = require('../models').User
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.upsert('user', {
      id: uuidv4(),
      username: 'admin',
      password_hash: UserModel.cryptoPassword('admin'),
      nickname: 'root',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      updated_at: new Date()
    }, {
      username: 'admin'
    }, UserModel, {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {
      truncate: true
    })
  }
}
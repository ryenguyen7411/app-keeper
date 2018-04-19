'use strict'

var faker = require('faker')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Images',
      [
        {
          note_id: 1,
          url: faker.image.food(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          note_id: 1,
          url: faker.image.food(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          note_id: 2,
          url: faker.image.food(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          note_id: 3,
          url: faker.image.food(),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          note_id: 3,
          url: faker.image.food(),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {})
  }
}

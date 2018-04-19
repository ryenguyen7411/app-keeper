'use strict'

var faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Notes',
      [
        {
          title: faker.name.jobTitle(),
          contents: JSON.stringify([
            {
              todo: faker.name.jobTitle(),
              isChecked: false
            },
            {
              todo: faker.name.jobTitle(),
              isChecked: true
            }
          ]),
          sort_value: 0,
          color_id: 1,
          mode: 'check',
          status_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: faker.name.jobTitle(),
          contents: JSON.stringify([
            {
              todo: faker.name.jobTitle(),
              isChecked: false
            },
            {
              todo: faker.name.jobTitle(),
              isChecked: true
            }
          ]),
          sort_value: 0,
          color_id: 2,
          mode: 'check',
          status_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: faker.name.jobTitle(),
          contents: JSON.stringify([
            {
              todo: faker.name.jobTitle(),
              isChecked: false
            },
            {
              todo: faker.name.jobTitle(),
              isChecked: true
            }
          ]),
          sort_value: 0,
          color_id: 3,
          mode: 'text',
          status_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', null, {})
  }
}

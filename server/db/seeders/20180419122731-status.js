'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Statuses',
      [
        {
          name: 'PUBLIC',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'ARCHIVED',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'DELETED',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Statuses', null, {})
  }
}

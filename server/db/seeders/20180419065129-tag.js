'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Tags',
      [
        {
          title: 'ABCD',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          title: 'Hello world',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {})
  }
}

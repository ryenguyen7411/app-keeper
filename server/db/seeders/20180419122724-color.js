'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Colors',
      [
        {
          hex: 'red',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          hex: '#888',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          hex: '#FF6842',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Colors', null, {})
  }
}

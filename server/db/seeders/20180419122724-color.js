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
        },
        {
          hex: '#F29725',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          hex: '#7755DD',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          hex: '#246484',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          hex: '#2277BB',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          hex: '#775599',
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

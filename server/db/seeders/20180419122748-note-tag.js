'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'NoteTags',
      [
        {
          note_id: 1,
          tag_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          note_id: 1,
          tag_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          note_id: 3,
          tag_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          note_id: 3,
          tag_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('NoteTags', null, {})
  }
}

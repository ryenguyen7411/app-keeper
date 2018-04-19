'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      contents: {
        type: Sequelize.STRING
      },
      sort_value: {
        type: Sequelize.INTEGER
      },
      pinned: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      remind_at: {
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Notes')
  }
}

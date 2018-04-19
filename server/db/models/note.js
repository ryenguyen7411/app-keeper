'use strict'
module.exports = (sequelize, DataTypes) => {
  var Note = sequelize.define(
    'Note',
    {
      title: DataTypes.STRING,
      contents: DataTypes.STRING,
      sort_value: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      pinned: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      color_id: { allowNull: false, type: DataTypes.INTEGER },
      status_id: { allowNull: false, type: DataTypes.INTEGER },
      remind_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE
    },
    {
      underscored: true,
      paranoid: true
    }
  )
  Note.associate = function(models) {
    // associations can be defined here
  }
  return Note
}

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
      mode: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'text'
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
    Note.belongTo(models.Color, { foreignKey: 'color_id', as: 'color' })
    Note.belongTo(models.Status, { foreignKey: 'status_id', as: 'status' })
    Note.hasMany(models.Image, { foreignKey: 'note_id', as: 'image' })
  }
  return Note
}

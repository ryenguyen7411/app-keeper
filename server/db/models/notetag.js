'use strict'
module.exports = (sequelize, DataTypes) => {
  var NoteTag = sequelize.define(
    'NoteTag',
    {
      note_id: { allowNull: false, type: DataTypes.INTEGER },
      tag_id: { allowNull: false, type: DataTypes.INTEGER },
      deleted_at: DataTypes.DATE
    },
    {
      underscored: true,
      paranoid: true
    }
  )
  NoteTag.associate = function(models) {
    NoteTag.belongsTo(models.Note, { foreignKey: 'note_id', as: 'note' })
    NoteTag.belongsTo(models.Tag, { goreignKey: 'tag_id', as: 'tag' })
  }
  return NoteTag
}

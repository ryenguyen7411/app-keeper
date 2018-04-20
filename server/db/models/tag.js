'use strict'
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define(
    'Tag',
    {
      title: DataTypes.STRING,
      deleted_at: DataTypes.DATE
    },
    {
      underscored: true,
      paranoid: true
    }
  )
  Tag.associate = function(models) {
    Tag.hasMany(models.NoteTag, { foreignKey: 'tag_id', as: 'tag' })
  }
  return Tag
}

'use strict'
module.exports = (sequelize, DataTypes) => {
  var Image = sequelize.define(
    'Image',
    {
      note_id: { allowNull: false, type: DataTypes.INTEGER },
      url: { type: DataTypes.STRING, validate: { isUrl: true } },
      deleted_at: DataTypes.DATE
    },
    {
      underscored: true,
      paranoid: true
    }
  )
  Image.associate = function(models) {
    Image.belongTo(models.Note, { foreignKey: 'note_id', onDelete: 'CASCADE' })
  }
  return Image
}

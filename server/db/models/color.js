'use strict'
module.exports = (sequelize, DataTypes) => {
  var Color = sequelize.define(
    'Color',
    {
      hex: { allowNull: false, type: DataTypes.STRING },
      deleted_at: DataTypes.DATE
    },
    {
      underscored: true,
      paranoid: true
    }
  )
  Color.associate = function(models) {
    // associations can be defined here
  }
  return Color
}

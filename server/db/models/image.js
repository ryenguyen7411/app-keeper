'use strict';
module.exports = (sequelize, DataTypes) => {
  var Image = sequelize.define('Image', {
    note_id: DataTypes.INTEGER,
    url: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    underscored: true,
  });
  Image.associate = function(models) {
    // associations can be defined here
  };
  return Image;
};
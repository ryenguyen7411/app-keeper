'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    title: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    underscored: true,
  });
  Tag.associate = function(models) {
    // associations can be defined here
  };
  return Tag;
};
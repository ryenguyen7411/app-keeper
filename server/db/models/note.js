'use strict';
module.exports = (sequelize, DataTypes) => {
  var Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    contents: DataTypes.STRING,
    sort_value: DataTypes.INTEGER,
    pinned: DataTypes.BOOLEAN,
    color: DataTypes.STRING,
    tag_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    remind_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    underscored: true,
  });
  Note.associate = function(models) {
    // associations can be defined here
  };
  return Note;
};
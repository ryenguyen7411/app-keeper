'use strict';
module.exports = (sequelize, DataTypes) => {
  var NoteTag = sequelize.define('NoteTag', {
    note_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER,
    deleted_at: DataTypes.DATE
  }, {
    underscored: true,
  });
  NoteTag.associate = function(models) {
    // associations can be defined here
  };
  return NoteTag;
};
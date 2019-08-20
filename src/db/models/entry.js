'use strict';
module.exports = (sequelize, DataTypes) => {
  var Entry = sequelize.define('Entry', {
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.STRING
  }, {});
  Entry.associate = function(models) {
    // associations can be defined here
  };
  return Entry;
};
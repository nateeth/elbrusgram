'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate({User}) {
      this.belongsTo(User, {foreignKey: 'ownerid', as: 'Owner'});
      this.belongsToMany(User, {through: 'UserGroups', as: 'GroupUser'});
    }
  }
  Group.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    ownerid: DataTypes.INTEGER,
    chatflag: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
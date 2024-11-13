'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Group, Message, UserGroup, Reaction}) {
      this.hasMany(Group, {foreignKey: 'ownerid', as: 'OwnerGroup'});
      this.belongsToMany(Group, { through: 'UserGroups', as: 'UserGroup' }); 
      this.hasMany(Reaction, {foreignKey: 'authorid'});
      this.hasMany(Message, {foreignKey: 'authorid'});
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    hashpass: DataTypes.STRING,
    nick: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
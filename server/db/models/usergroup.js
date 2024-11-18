'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userid', as: 'User' });

      this.belongsTo(models.Group, { foreignKey: 'groupid', as: 'Group' });
    }
  }
  UserGroup.init({
    groupid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserGroup',
  });
  return UserGroup;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Driver.belongsTo(models.Member, {
        foreignKey: 'memberId',
        as: 'member'
      });
      Driver.hasMany(models.Trip, {
        foreignKey: 'driverId',
        as: 'trips'
      });
      Driver.hasMany(models.Vehicle, {
        foreignKey: 'driverId',
        as: 'vehicles'
      });
    }
  }
  Driver.init({
    fullName: DataTypes.STRING,
    phone: DataTypes.STRING,
    memberId: DataTypes.INTEGER,
    profileImg: DataTypes.STRING,
    license: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Driver',
  });
  return Driver;
};
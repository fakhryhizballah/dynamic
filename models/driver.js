'use strict';
const {
  Model
} = require('sequelize');
const jwt = require('jsonwebtoken');
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
    generateToken = () => {
      const payload = {
        id: this.id,
        fullName: this.fullName,
        phone: this.phone,
        profileImg: this.profileImg,
        license: this.license
      };
      const secretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign(payload, secretKey, { expiresIn: 360 * 60 });
      return token;
    };
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
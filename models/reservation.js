'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reservation.init({
    tripId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    seats: DataTypes.INTEGER,
    status: DataTypes.ENUM('booking', 'approved', 'rejected'),
    price: DataTypes.FLOAT,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};
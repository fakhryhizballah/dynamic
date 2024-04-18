'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Route.init({
    name: DataTypes.STRING,
    descriptionRoute: DataTypes.STRING,
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    distance: DataTypes.FLOAT,
    duration: DataTypes.FLOAT,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};
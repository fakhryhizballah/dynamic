'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      driverId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Drivers',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      vehicleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Vehicles',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      origin: {
        type: Sequelize.STRING,
        references: {
          model: 'Destinations',
          key: 'name'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      destination: {
        type: Sequelize.STRING,
        references: {
          model: 'Destinations',
          key: 'name'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      departure: {
        type: Sequelize.DATE
      },
      arrival: {
        type: Sequelize.DATE
      },
      price: {
        type: Sequelize.FLOAT
      },
      seats: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('ready', 'pick-up', 'on-trip', 'completed', 'cancelled')
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Trips');
  }
};
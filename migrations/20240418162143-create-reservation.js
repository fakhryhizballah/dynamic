'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tripId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Trips',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      origin: {
        type: Sequelize.STRING,
        references: {
          model: 'Destinations',
          key: 'name'
        }
      },
      destination: {
        type: Sequelize.STRING,
        references: {
          model: 'Destinations',
          key: 'name'
        }
      },
      seats: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('booking', 'approved', 'rejected')
      },
      price: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Reservations');
  }
};
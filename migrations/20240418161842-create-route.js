'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      descriptionRoute: {
        type: Sequelize.STRING
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
          model: {
            tableName: 'Destinations',
          },
          key: 'name'
        }
      },
      distance: {
        type: Sequelize.FLOAT
      },
      duration: {
        type: Sequelize.FLOAT
      },
      price: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Routes');
  }
};
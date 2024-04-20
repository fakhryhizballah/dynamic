'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Routes', [
      {
        name: 'Sambas-Pemangkat',
        descriptionRoute: "['Sambas', 'Pemangkat']",
        origin: 'Sambas',
        destination: 'Pemangkat',
        distance: 300,
        duration: 5,
        price: 300000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sambas-Singkawang',
        descriptionRoute: "['Sambas', 'Pemangkat', 'Singkawang']",
        origin: 'Sambas',
        destination: 'Singkawang',
        distance: 200,
        duration: 4,
        price: 200000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sambas-Mempawah',
        descriptionRoute: "['Sambas', 'Pemangkat', 'Singkawang', 'Mempawah']",
        origin: 'Sambas',
        destination: 'Mempawah',
        distance: 282,
        duration: 4.5,
        price: 280000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sambas-Pontianak',
        descriptionRoute: "['Sambas', 'Pemangkat', 'Singkawang', 'Mempawah', 'Pontianak']",
        origin: 'Sambas',
        destination: 'Pontianak',
        distance: 300,
        duration: 5,
        price: 300000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pemangkat-Sambas',
        descriptionRoute: "['Pemangkat', 'Sambas']",
        origin: 'Pemangkat',
        destination: 'Sambas',
        distance: 300,
        duration: 5,
        price: 300000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pemangkat-Singkawang',
        descriptionRoute: "['Pemangkat', 'Singkawang']",
        origin: 'Pemangkat',
        destination: 'Singkawang',
        distance: 100,
        duration: 2,
        price: 100000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pemangkat-Pontianak',
        descriptionRoute: "['Pemangkat', 'Singkawang', 'Mempawah', 'Pontianak']",
        origin: 'Pemangkat',
        destination: 'Pontianak',
        distance: 182,
        duration: 5,
        price: 300000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pemangkat-Mempawah',
        descriptionRoute: "['Pemangkat', 'Singkawang', 'Mempawah']",
        origin: 'Pemangkat',
        destination: 'Mempawah',
        distance: 182,
        duration: 5,
        price: 300000,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        name: 'Singkawang-Pontianak',
        descriptionRoute: "['Singkawang', 'Mempawah', 'Pontianak']",
        origin: 'Singkawang',
        destination: 'Pontianak',
        distance: 100,
        duration: 2,
        price: 100000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mempawah-Pontianak',
        descriptionRoute: "['Mempawah', 'Pontianak']",
        origin: 'Mempawah',
        destination: 'Pontianak',
        distance: 18,
        duration: 0.5,
        price: 50000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pontianak-Mempawah',
        descriptionRoute: "['Pontianak', 'Mempawah']",
        origin: 'Pontianak',
        destination: 'Mempawah',
        distance: 18,
        duration: 0.5,
        price: 50000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pontianak-Singkawang',
        descriptionRoute: "['Pontianak', 'Mempawah', 'Singkawang']",
        origin: 'Pontianak',
        destination: 'Singkawang',
        distance: 100,
        duration: 2,
        price: 100000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pontianak-Pemangkat',
        descriptionRoute: "['Pontianak', 'Mempawah', 'Singkawang', 'Pemangkat']",
        origin: 'Pontianak',
        destination: 'Pemangkat',
        distance: 100,
        duration: 2,
        price: 100000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pontianak-Sambas',
        descriptionRoute: "['Pontianak', 'Mempawah', 'Singkawang', 'Pemangkat', 'Sambas']",
        origin: 'Pontianak',
        destination: 'Sambas',
        distance: 300,
        duration: 5,
        price: 300000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Singkawang-Mempawah',
        descriptionRoute: "['Singkawang', 'Mempawah']",
        origin: 'Singkawang',
        destination: 'Mempawah',
        distance: 82,
        duration: 1.5,
        price: 80000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Singkawang-Pemangkat',
        descriptionRoute: "['Singkawang', 'Pemangkat']",
        origin: 'Singkawang',
        destination: 'Pemangkat',
        distance: 82,
        duration: 1.5,
        price: 80000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Singkawang-Sambas',
        descriptionRoute: "['Singkawang', 'Sambas']",
        origin: 'Singkawang',
        destination: 'Pemangkat',
        distance: 82,
        duration: 1.5,
        price: 80000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mempawah-Singkawang',
        descriptionRoute: "['Mempawah', 'Singkawang']",
        origin: 'Mempawah',
        destination: 'Singkawang',
        distance: 82,
        duration: 1.5,
        price: 80000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mempawah-Pemangkat',
        descriptionRoute: "['Mempawah','Singkawang', 'Pemangkat']",
        origin: 'Mempawah',
        destination: 'Pemangkat',
        distance: 82,
        duration: 1.5,
        price: 80000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mempawah-Sambas',
        descriptionRoute: "['Mempawah','Singkawang', 'Pemangkat', 'Sambas']",
        origin: 'Mempawah',
        destination: 'Sambas',
        distance: 82,
        duration: 1.5,
        price: 80000,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Routes', null, {});
  }
};

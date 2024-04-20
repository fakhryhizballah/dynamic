'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        fullName: 'Amar',
        phone: '089678441295',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
    await queryInterface.bulkInsert('Drivers', [
      {
        id: 1,
        fullName: 'Fakhry',
        phone: '0895321701798',
        memberId: null,
        profileImg: null,
        license: null,
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
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Drivers', null, {});
  }
};

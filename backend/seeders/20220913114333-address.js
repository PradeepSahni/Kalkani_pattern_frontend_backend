'use strict';
const { faker } = require('@faker-js/faker')
module.exports = {
  async up (queryInterface, Sequelize) {
    let allList = []; 
    for (let i = 0; i < 50; i++) {
      let  row = {
        uID: i+1,
        add1 : faker.location.streetAddress(),
        add2: faker.location.streetAddress(),
        pinCode: faker.location.zipCode('####'),
        city: faker.location.city(),
        state: faker.location.state(),
        type: 'Home',
      };
      allList.push(row)
    }
    await queryInterface.bulkInsert('addresses',allList, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

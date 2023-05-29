'use strict';
const { faker } = require('@faker-js/faker')
module.exports = {
  async up (queryInterface, Sequelize) {
    let allUserList = []; 
    for (let i = 0; i < 50; i++) {
      let  row = {
        firstName : faker.person.firstName(),
        lastName: faker.person.lastName(),
			  mobile: faker.phone.number(),
        email : faker.internet.email(),
        birthDay : faker.date.birthdate()
      };
      allUserList.push(row)
    }
    
    await queryInterface.bulkInsert('users',allUserList, {});
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

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
    */
      return queryInterface.bulkInsert('Users', [{
        firstname: "John",
        lastname: "Doe",
        email: "johndoe@fakegmail.com",
        password: "password",
        createdAt: new Date(),
        updatedAt: new Date()
       }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tournaments', [
        {
        userID: 2,
        title: "Tom's Tournament",
        publicURL: "123456",
        winner: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        userID: 2,
        title: "Matt's Tournament",
        publicURL: "456789",
        winner: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        userID: 2,
        title: "Brandon's Tournament",
        publicURL: "159482",
        winner: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        userID: 2,
        title: "Dean's Tournament",
        publicURL: "987654",
        winner: "",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
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

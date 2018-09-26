'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tournaments', [
        {
        userID: 2,
        title: "Tom's Tournament",
        publicURL: "TomsTournament",
        winner: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        userID: 2,
        title: "Matt's Tournament",
        publicURL: "MattsTournament",
        winner: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        userID: 2,
        title: "Brandon's Tournament",
        publicURL: "BrandonsTournament",
        winner: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        userID: 2,
        title: "Dean's Tournament",
        publicURL: "DeansTournament",
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

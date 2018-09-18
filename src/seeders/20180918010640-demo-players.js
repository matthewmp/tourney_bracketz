'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Players', [
      {
        tournamentID: 1,
        playername: "Tom-1",
        seed: 1,
        wins: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        tournamentID: 1,
        playername: "Matt-2",
        seed: 2,
        wins: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        tournamentID: 1,
        playername: "Brandon-3",
        seed: 3,
        wins: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        tournamentID: 1,
        playername: "Dean-4",
        seed: 4,
        wins: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        tournamentID: 1,
        playername: "Jose-5",
        seed: 5,
        wins: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        tournamentID: 1,
        playername: "Joanne-6",
        seed: 6,
        wins: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        tournamentID: 2,
        playername: "Gillian-1",
        seed: 1,
        wins: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        tournamentID: 2,
        playername: "Lisa-2",
        seed: 2,
        wins: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        tournamentID: 2,
        playername: "Isabella-3",
        seed: 3,
        wins: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        tournamentID: 2,
        playername: "Val-4",
        seed: 4,
        wins: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        tournamentID: 2,
        playername: "Richard-5",
        seed: 5,
        wins: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        tournamentID: 2,
        playername: "John-6",
        seed: 6,
        wins: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        tournamentID: 2,
        playername: "Michelle-7",
        seed: 7,
        wins: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        tournamentID: 2,
        playername: "Amy-8",
        seed: 8,
        wins: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        tournamentID: 2,
        playername: "Vivian-9",
        seed: 9,
        wins: 0,
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

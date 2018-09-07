'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define('Tournament', {
    userID: {
        type: Sequelize.INTEGER
    },
    numPlayers: {
        type: Sequelize.STRING
    },
    winner: {
        type: Sequelize.STRING
    } 
  }, {});
  Tournament.associate = function(models) {
    // associations can be defined here
  };
  return Tournament;
};
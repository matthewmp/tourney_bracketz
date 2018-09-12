// Declare the table definitions for the tournament table.
'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define('Tournament', {
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    numPlayers: {
        type: Sequelize.STRING,
        allowNull: false
    },
    winner: {
        type: Sequelize.STRING
    } 
  }, {});
  // Tournament.associate = function(models) {
    // associations can be defined here
  // };
  return Tournament;
};
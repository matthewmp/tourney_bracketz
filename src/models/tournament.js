'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define('Tournament', {
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    winner: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Tournament.associate = function(models) {
    // associations can be defined here
  };
  return Tournament;
};
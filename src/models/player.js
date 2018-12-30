'use strict';
module.exports = (sequelize, DataTypes) => {
  const Players = sequelize.define('Players', {
    tournamentID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    playername: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seed: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Players.associate = function(models) {
    // associations can be defined here
    // Each Player has One Tournament. The foreign key in the Players table (tournamentId) is the 'id' from the Tournament table
    Players.belongsTo(models.Tournament, {
      foreignKey: 'tournamentID',
      onDelete: 'cascade' //Delete all players if tournament is deleted
    });
  };
  return Players;
};
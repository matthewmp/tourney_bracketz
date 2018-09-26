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
    publicURL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    winner: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Tournament.associate = function(models) {
    // associations can be defined here 
    // Each Tournaments has One User. The foreign key in the Tournament table (userID) is the 'id' from the User table
    Tournament.belongsTo(models.User, {foreignKey: 'userID'});

    // Each Tournaments has many Players. The foreign key in the Players table (tournamentID) is the 'id' from the Tournament table
    // Tournament.hasMany(models.Players, {foreignKey: 'tournamentID'});
  };
  return Tournament;
};
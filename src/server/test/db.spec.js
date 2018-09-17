const config = require('../../config/sequelize_config');
const env = config.development;
const Sequelize = require('sequelize');

const connection = new Sequelize(env.database, env.username, env.password, {
  dialect: env.dialect,
  host: env.host
});

connection.query('show tables').then(function(rows) {
    console.log('\nDB Connection Established\n');
    console.log('\nList of Tables: \n', rows);
})
.catch(err => console.log(err));
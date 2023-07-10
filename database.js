require('dotenv').config();
const Sequelize = require('sequelize');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;


const sequelize = new Sequelize(dbName, dbUser, password, {
  host: dbHost,
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
      port: 1433,
    },
  },
});


module.exports = sequelize;
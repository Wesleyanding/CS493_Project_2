const { Sequelize } = require('sequelize');

console.log(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD);

const database = process.env.MYSQL_DATABASE || 'Businesses';
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const dbhost = process.env.MYSQL_HOST || 'localhost';

const sequelize = new Sequelize(database, username, password,{
    dialect: 'mysql',
    host: dbhost,
    port: process.env.MYSQL_PORT || '3306',
    // database: process.env.MYSQL_DATABASE,
    // username: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD
});

module.exports = sequelize;

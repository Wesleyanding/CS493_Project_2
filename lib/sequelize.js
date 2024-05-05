const { Sequelize } = require('sequelize');

console.log(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD);
const sequelize = new Sequelize('Businesses', 'cs493', 'hunter2',{
    dialect: 'mysql',
    host: 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    // database: process.env.MYSQL_DATABASE,
    // username: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD
});

module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD,{
    dialect: 'mysql',
    host: 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    // database: process.env.MYSQL_DATABASE,
    // username: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD
});

module.exports = sequelize;

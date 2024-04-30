const { DataTypes } = require('sequelize');

const sequelize = require('../lib/sequelize');

const Photo = sequelize.define('Photo', {
    userid: { type: DataTypes.INTEGER, allowNull: false },
    caption: { type: DataTypes.STRING, allowNull: true }
});

exports.Photo = Photo;
exports.PhotoClientFields = [
    'userid',
    'caption',
    'businessid'
];
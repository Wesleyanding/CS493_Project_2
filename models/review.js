const { DataTypes } = require('sequelize');

const sequelize = require('../lib/sequelize');

const Review = sequelize.define('Review', {
    userid: { type: DataTypes.INTEGER, allowNull: false },
    dollars: { type: DataTypes.INTEGER, allowNull: false },
    stars: { type: DataTypes.INTEGER, allowNull: false },
    review: { type: DataTypes.STRING, allowNull: true }
});

exports.Review = Review;

exports.ReviewClientFields = [
    'userid',
    'dollars',
    'stars',
    'review',
    'businessid'
];
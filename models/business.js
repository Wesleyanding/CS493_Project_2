const { DataTypes } = require('sequelize');

const sequelize = require('../lib/sequelize');
const { Review } = require('./review.js');
const { Photo } = require('./photo.js');

const Business = sequelize.define('Business', {
    ownerid: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    zip: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    subcategory: { type: DataTypes.STRING, allowNull: false },
    website: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true }
});

// Define relationships between models
Business.hasMany(Review, { foreignKey: 'businessId', allowNull: false });
Review.belongsTo(Business, { foreignKey: 'businessId' });

Business.hasMany(Photo, { foreignKey: 'businessId', allowNull: false });
Photo.belongsTo(Business, { foreignKey: 'businessId' });

exports.Business = Business;

exports.BusinessClientFields = [
    'ownerid',
    'name',
    'address',
    'city',
    'state',
    'zip',
    'phone',
    'category',
    'subcategory',
    'website',
    'email'
];
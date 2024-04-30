const sequelize = require('./lib/sequelize');
const { Business, BusinessClientFields } = require('./models/business');
const { Photo, PhotoClientFields } = require('./models/photo');
const { Review, ReviewClientFields } = require('./models/review');

const businessData = require('./data/business.json');
const photoData = require('./data/photo.json');
const reviewData = require('./data/review.json');

sequelize.sync().then(async () => {
  await Business.bulkCreate(businessData, { fields: BusinessClientFields });
  await Photo.bulkCreate(photoData, { fields: PhotoClientFields });
  await Review.bulkCreate(reviewData, { fields: ReviewClientFields });
  process.exit();
});

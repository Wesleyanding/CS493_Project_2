const sequelize = require('./lib/sequelize');
const { Business, BusinessClientFields } = require('./models/business');
const { Photo, PhotoClientFields } = require('./models/photo');
const { Review, ReviewClientFields } = require('./models/review');

const businessData = require('./data/businesses.json');
const photoData = require('./data/photos.json');
const reviewData = require('./data/reviews.json');

sequelize.sync().then(async () => {
  await Business.bulkCreate(businessData, { fields: BusinessClientFields });
  await Photo.bulkCreate(photoData, { fields: PhotoClientFields });
  await Review.bulkCreate(reviewData, { fields: ReviewClientFields });
  process.exit();
});

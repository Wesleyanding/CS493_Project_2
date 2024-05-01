const { ValidationError } = require('sequelize');

const { Review, ReviewClientFields } = require('../models/review');
const { Router } = require('express');

const router = Router();

/*
 * Route to create a new review.
 */
router.post('/', async function (req, res, next) {
  try {
    const review = await Review.create(req.body, ReviewClientFields);
    res.status(201).json({
      id: review.id,
      links: {
        review: `/reviews/${review.id}`,
        business: `/businesses/${review.businessid}`
      }
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({
        error: "Request body is not a valid review object"
      });
    } else {
      next(err);
    }
  }
});

/*
 * Route to fetch info about a specific review.
 */
router.get('/:reviewID', async function (req, res, next) {
  const reviewID = req.params.reviewID;
  const review = await Review.findByPk(reviewID);
  if (review) {
    res.status(200).json(review);
  } else {
    next();
  }
});

/*
 * Route to update a review.
 */
router.patch('/:reviewID', async function (req, res, next) {
  const reviewID = req.params.reviewID;
  const result = await Review.update(req.body, {
    where: {
      id: reviewID
    },
    fields: ReviewClientFields.filter(f => f !== 'businessid' && f !== 'userid')
  });
  if (result[0]) {
    res.status(200).end();
  } else {
    next();
  }
});

/*
 * Route to delete a review.
 */
router.delete('/:reviewID', async function (req, res, next) {
  const reviewID = parseInt(req.params.reviewID);
  const result = await Review.destroy({
    where: {
      id: reviewID
    }
  });
  if (result) {
    res.status(200).end();
  } else {
    next();
  }
});

module.exports = router;
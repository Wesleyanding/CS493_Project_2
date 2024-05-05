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
        business: `/businesses/${review.businessId}`,
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
router.get('/:reviewId', async function (req, res, next) {
  const reviewId = req.params.reviewId;
  const review = await Review.findByPk(reviewId);
  if (review) {
    res.status(200).json(review);
  } else {
    next();
  }
});

/*
 * Route to update a review.
 */
router.patch('/:reviewId', async function (req, res, next) {
  const reviewId = req.params.reviewId;
  const result = await Review.update(req.body, {
    where: {
      id: reviewId
    },
    fields: ReviewClientFields.filter(f => f !== 'businessId' && f !== 'userId')
  });
  if (result[0] > 0) {
    res.status(200).send();
  } else {
    next();
  }
});

/*
 * Route to delete a review.
 */
router.delete('/:reviewId', async function (req, res, next) {
  const reviewId = parseInt(req.params.reviewId);
  const result = await Review.destroy({
    where: {
      id: reviewId
    }
  });
  if (result > 0) {
    res.status(200).send();
  } else {
    next();
  }
});

module.exports = router;
const { Router }= require('express');
const { ValidationError } = require('sequelize');

const { Photo, PhotoClientFields } = require('../models/photo');

const router = new Router();

/*
 * Route to create a new photo.
 */
router.post('/', async function (req, res, next) {
  try {
    const photo = await Photo.create(req.body, PhotoClientFields);
    res.status(201).json({
      id: photo.id,
      links: {
        photo: `/photos/${photo.id}`,
        business: `/businesses/${photo.businessid}`
      }
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({
        error: "Request body is not a valid photo object"
      });
    } else {
      next(err);
    }
  }
});

/*
 * Route to fetch info about a specific photo.
 */
router.get('/:photoId', async function (req, res, next) {
  const photoId = req.params.photoId;
  const photo = await Photo.findByPk(photoId);
  if (photo) {
    res.status(200).json(photo);
  } else {
    next();
  }
});

/*
 * Route to update a photo. Used a patch to allow partial updates.
 */
router.patch('/:photoId', async function (req, res, next) {
  const photoId = req.params.photoID;
  const result = await Photo.update(req.body, {
    where: {
      id: photoId
    },
    fields: PhotoClientFields.filter(f => f !== 'businessId' && f !== 'userId')
  });
  if (result[0] > 0) {
    res.status(204).send();
  } else {
    next();
  }
});

/*
 * Route to delete a photo.
 */
router.delete('/:photoId', async function (req, res, next) {
  const photoId = parseInt(req.params.photoId);
  const result = await Photo.destroy({
    where: {
      id: photoId
    }
  });
  if (result) {
    res.status(200).end();
  } else {
    next();
  }
});

module.exports = router;
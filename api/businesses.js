const { Router } = require('express');
const { ValidationError } = require('sequelize');

const { Business, BusinessClientFields } = require('../models/business');
const { Review } = require('../models/review');
const { Photo } = require('../models/photo');

const router = Router();

/*
 * Route to return a list of businesses.
 */
router.get('/', async function (req, res) {

  /*
  * Compute page number based on optional query string parameter `page`.
  * Make sure page is within allowed bounds.
  */
 let page = parseInt(req.query.page) || 1;
 const numPerPage = 10;
 page = page < 1 ? 1 : page;
 
 const start = (page - 1) * numPerPage;
 // Setting the result for the businesses
 const  result = await Business.findAndCountAll({
   limit: numPerPage,
   offset: start
 });
 /*
 * Calculate starting and ending indices of businesses on requested page and
  * slice out the corresponsing sub-array of busibesses.
  */
 
 /*
 * Generate HATEOAS links for surrounding pages.
 */
const lastPage = Math.ceil(result.count / numPerPage);
const links = {};
  if (page < lastPage) {
    links.nextPage = `/businesses?page=${page + 1}`;
    links.lastPage = `/businesses?page=${lastPage}`;
  }
  if (page > 1) {
    links.prevPage = `/businesses?page=${page - 1}`;
    links.firstPage = '/businesses?page=1';
  }

  /*
   * Construct and send response.
   */
  res.status(200).json({
    businesses: result.rows,
    pageNumber: page,
    totalPages: lastPage,
    pageSize: numPerPage,
    totalCount: result.count,
    links: links
  });

});

/*
 * Route to create a new business.
 */
router.post('/', async function (req, res, next) {
  try {
    const business = await Business.create(req.body, BusinessClientFields);
    res.status(201).json({
      id: business.id,
      links: {
        business: `/businesses/${business.id}`
      }
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({
        error: "Request body is not a valid business object"
      });
    } else {
      next(err);
    }
  }
});

/*
 * Route to fetch info about a specific business.
 */
router.get('/:businessId', async function (req, res, next) {
  const businessId = req.params.businessId;
  const business = await Business.findByPk(businessId, {
    include: [Review, Photo]
  });
  if (business) {
    res.status(200).json(business);
  } else {
    next();
  } 
});

/*
 * Route to replace data for a business.
 */
router.put('/:businessId', async function (req, res, next) {
  const businessId = req.params.businessId;
  const result = await Business.update(req.body, {
    where: {
      id: businessId
    },
    fields: BusinessClientFields
  });
  if (result[0] > 0) {
    res.status(204).send();
  } else {
    next();
  }
});

/*
 * Route to delete a business.
 */
router.delete('/:businessId', async function (req, res, next) {
  const businessId = req.params.businessId;
  const result = await Business.destroy({
    where: {
      id: businessId
    }
  });
  if (result > 0) {
    res.status(204).send();
  } else {
    next();
  }
});

module.exports = router;

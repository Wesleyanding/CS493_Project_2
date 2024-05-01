const router = require('express').Router();
const { VaidationError } = require('sequelize');

const { Business, BusinessClientFields } = require('../models/business');
const { Review } = require('../models/review');
const { Photo } = require('../models/photo');

exports.router = router;

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
  const lastPage = Math.ceil(businesses.length / numPerPage);
  page = page > lastPage ? lastPage : page;
  page = page < 1 ? 1 : page;

  /*
   * Calculate starting and ending indices of businesses on requested page and
   * slice out the corresponsing sub-array of busibesses.
   */
  const start = (page - 1) * numPerPage;
  const end = start + numPerPage;

  // Setting the result for the businesses
  const  result = await Business.findAndCountAll({
    limit: numPerPage,
    offset: start
  });
  /*
   * Generate HATEOAS links for surrounding pages.
   */
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
router.get('/:businessid', async function (req, res, next) {
  const businessid = req.params.businessid;
  const business = await Business.findByPk(businessid, {
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
router.put('/:businessid', async function (req, res, next) {
  const businessid = req.params.businessid;
  const result = await Business.update(req.body, {
    where: {
      id: businessid
    },
    fields: BusinessClientFields
  });
  if (result[0]) {
    res.status(200).end();
  } else {
    next();
  }
});

/*
 * Route to delete a business.
 */
router.delete('/:businessid', async function (req, res, next) {
  const businessid = req.params.businessid;
  const result = await Business.destroy({
    where: {
      id: businessid
    }
  });
  if (result) {
    res.status(204).end();
  } else {
    next();
  }
});

module.exports = router;

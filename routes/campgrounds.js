const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const { campgroundSchema, reviewSchema } = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });




// Index page render
router.get('/', catchAsync(campgrounds.index));

// create new campground
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

// To update to DB and redirect
router.post('/', isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

// Show page render
router.get('/:id', catchAsync(campgrounds.showCampground));

//edit the existing campground

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;
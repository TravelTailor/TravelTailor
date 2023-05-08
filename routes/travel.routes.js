const router = require('express').Router();
const Travel = require('../models/Travel.model');
const User = require('../models/User.model');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const accuweather = require('node-accuweather')()(process.env.YOUR_API_KEY);

//Search index
router.get('/search', isLoggedIn, (req, res, next) => res.render('travels/search'));

//Search city
router.get('/city-search', isLoggedIn, (req, res, next) => {
    const { city } = req.query;

    accuweather
    .getCurrentConditions(city, {unit: "Celsius"})
    .then(function(result) {
     console.log(result);
     res.render('travels/city-search-result', { city, result });
  })
});


//Create travel form
router.get('/create-travel/:city', isLoggedIn, (req, res, next) => {
    const { city } = req.params;

    res.render('travels/create-travel', { city });
});

router.post('/create-travel/:city', isLoggedIn, (req, res, next) => {
    const { country, city, startDate, endDate, budget } = req.body;

    if (!country || !city || !startDate || !endDate || !budget) {
        res.render('travels/create-travel', { errorMessage: 'All fields are mandatory. Please provide country, city, start date, end date and budget.' });
        return;
    }

    Travel.create({
        country,
        city,
        startDate,
        endDate,
        budget,
        user: req.session.currentUser._id
    })
        .then(travel => {
            console.log('Newly created travel is: ', travel);
            res.redirect('/userProfile', { travel });
        })
        .catch(error => next(error));
});

//Edit travel form

module.exports = router;
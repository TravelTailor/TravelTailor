const router = require('express').Router();
const Travel = require('../models/Travel.model');
const User = require('../models/User.model');
const Task = require('../models/Task.model');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const accuweather = require('node-accuweather')()(process.env.YOUR_API_KEY);
const mapboxgl = require('mapbox-gl');
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
require('dotenv').config();


//Search index
router.get('/search', isLoggedIn, (req, res, next) => res.render('travels/search'));


//Mapbox + Accuweather
const axios = require('axios');

router.get('/city-search', isLoggedIn, async(req, res, next) => {
    const { city } = req.query;
    const accessToken = process.env.MAPBOX_API; // Access token de Mapbox

    try {
        const geocodeResponse = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json`, {
            params: {
                access_token: accessToken
            }
        });

        const coordinates = geocodeResponse.data.features[0].geometry.coordinates;
        const longitude = coordinates[0];
        const latitude = coordinates[1];

        accuweather
            .getCurrentConditions(city, { unit: "Celsius" })
            .then(function(result) {
                console.log(result);
                res.render('travels/city-search-result', { city, latitude, longitude, result });
            })
            .catch(function(error) {
                console.error(error);
                res.render('error', { message: 'Error en la solicitud de condiciones actuales de AccuWeather' });
            });
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'Error en la solicitud de geocodificación' });
    }
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
            res.redirect('/travel-list');
        })
        .catch(error => next(error));
});

//Travel list
router.get('/travel-list', isLoggedIn, (req, res, next) => {
    Travel.find({ user: req.session.currentUser._id })
        .then(travelsFromDB => {
            console.log('Travels from DB: ', travelsFromDB);
            res.render('travels/travel-list', { travels: travelsFromDB });
        })
        .catch(error => next(error));
});

//Travel details
router.get('/travel-list/:travelId', isLoggedIn, (req, res, next) => {
    const { travelId } = req.params;
    let travel;

    Travel.findById(travelId)
        .then(travelFromDB => {
            travel = travelFromDB;
            return Task.find({ travel: travelId });
        })
        .then((tasksFromDB) => res.render('travels/travel-details', { travel, tasks: tasksFromDB }))
        .catch(error => next(error));
});

//Delete travel
router.post('/travel-list/:travelId/delete', isLoggedIn, (req, res, next) => {
    const { travelId } = req.params;

    Travel.findByIdAndRemove(travelId)
        .then(() => res.redirect('/travel-list'))
        .catch(error => next(error));
});

//Edit travel
router.get('/travel-list/:travelId/edit', isLoggedIn, (req, res, next) => {
    const { travelId } = req.params;
    Travel.findById(travelId)
        .populate('tasks')
        .then(travelFromDB => {
            console.log('Travel from DB: ', travelFromDB);
            res.render('travels/edit-travel', { travel: travelFromDB });
        })
        .catch(error => next(error));
});

router.post('/travel-list/:travelId/edit', isLoggedIn, (req, res, next) => {
    const { travelId } = req.params;
    const { country, city, travelImg, startDate, endDate, budget } = req.body;
    Travel.findByIdAndUpdate(travelId, { country, city, travelImg, startDate, endDate, budget }, { new: true })
        .then(editedTravel => {
            console.log('Edited travel: ', editedTravel);
            res.redirect(`/travel-list/${travelId}`);
        })
        .catch(error => next(error));
});









module.exports = router;
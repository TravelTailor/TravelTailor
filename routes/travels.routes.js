const express = require('express');
const axios = require('axios');
const router = express.Router();

const openTripApiKey = '5ae2e3f221c38a28845f05b69a5f581c44d55130ebda758fef76026a';

router.get('/travels', (req, res, next) => {
    res.render('travels/search');
});

router.post('/travels/results', async(req, res, next) => {
    const city = req.body.city;

    try {
        const locationResponse = await axios.get(`https://api.opentripmap.com/0.1/en/places/search?name=${city}&apikey=${openTripApiKey}`);
        const locationData = locationResponse.data.features[0];

        if (!locationData) {
            return res.render('travels/search-results', { data: null });
        }

        const { lon, lat } = locationData.geometry.coordinates;
        const placesResponse = await axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${name}&apikey=${openTripApiKey}`);
        const placesData = placesResponse.data.features;

        res.render('travels/search-results', { data: { name: city, lat, lon, country: locationData.properties.country, places: placesData } });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al procesar la solicitud');
    }
});

module.exports = router;
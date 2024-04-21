'use strict';
const express = require("express");
const routes = express.Router();
const middleware = require('../middleware');
const index = require('../controllers');


routes.post('/auth/otp', index.getOTP);
routes.post('/driver/login', index.loginDrver);
routes.post('/driver/vehicle', middleware.driver, index.addVehicle);
routes.get('/driver/vehicle', middleware.driver, index.getDriverVehicle);
routes.delete('/driver/vehicle/:id', middleware.driver, index.deleteVehicle);
routes.post('/driver/trip', middleware.driver, index.addTrip);
routes.get('/driver/trip', middleware.driver, index.getDriverTrip);
routes.delete('/driver/trip/:id', middleware.driver, index.deleteTrip);
routes.put('/driver/trip', middleware.driver, index.updateTrip);
// routes.get('/driver/reservation/:tripId', middleware.driver, index.getDriverTripById);
// routes.post('/driver/reservation/', middleware.driver, index.addReservation);


routes.get('/passenger/trip', index.findTrip);



module.exports = routes;
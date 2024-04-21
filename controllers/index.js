const { sequelize, Driver, Vehicle, Trip, Route } = require("../models");
const { Op } = require("sequelize");

module.exports = {
    getOTP: async (req, res) => {
        try {
            const { noWa } = req.body;
            if (!noWa) {
                return res.status(400).json({
                    status: false,
                    message: 'All fields are required',
                    data: null
                });
            }
            let otp = Math.floor(1000 + Math.random() * 9000);
            req.cache.set(`otp:${noWa}`, otp);
            req.cache.expire(`otp:${noWa}`, 300);
            return res.status(200).json({
                status: true,
                message: 'OTP has been sent',
                data: null
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message,
                data: null
            });
        }
    },
    regisDrver: async (req, res) => {
        try {
            const { fullName, phone, memberId, profileImg, license } = req.body;
            if (!fullName || !phone || !memberId || !profileImg || !license) {
                return res.status(400).json({
                    status: false,
                    message: 'All fields are required',
                    data: {
                        fullName: fullName,
                        phone: phone,
                        memberId: memberId,
                        profileImg: profileImg,
                        license: license
                    }
                });
            }
            const data = await Driver.create({
                fullName: fullName,
                phone: phone,
                memberId: memberId,
                profileImg: profileImg,
                license: license
            });
            return res.status(201).json({
                status: true,
                message: 'Driver has been created',
                data: data
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message,
                data: null
            });
        }
    },
    loginDrver: async (req, res) => {
        try {
            const { noWa, otp } = req.body;
            if (!noWa || !otp) {
                return res.status(400).json({
                    status: false,
                    message: 'All fields are required',
                    data: {
                        noWa: noWa,
                        otp: otp
                    }
                });
            }
            const otpCache = await req.cache.get(`otp:${noWa}`);
            console.log(otpCache);
            if (otpCache !== otp) {
                return res.status(400).json({
                    status: false,
                    message: 'Invalid OTP',
                    data: null
                });
            }
            const data = await Driver.findOne({
                where: {
                    phone: noWa
                }
            });
            if (data) {
                const token = data.generateToken();
                req.cache.set(`token:driver:${data.phone}`, token);
                req.cache.expire(`token:driver:${data.phone}`, 360 * 60);
                return res.status(200).json({
                    status: true,
                    message: 'Login success',
                    data:
                    {
                        access_token: token
                    }
                });
            } else {
                return res.status(404).json({
                    status: false,
                    message: 'Driver not found',
                    data: null
                });
            }
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message,
                data: null
            });
        }
    },
    addVehicle: async (req, res) => {
        try {
            let {
                plate,
                brand,
                model,
                year,
                color,
                seats,
                photo } = req.body;
            if (!plate || !brand || !model || !year || !color || !seats || !photo) {
                return res.status(400).json({
                    status: false,
                    message: 'All fields are required',
                    data: req.body
                });
            }
            let t = await sequelize.transaction();
            try {
                let vehicle = await Vehicle.findOne({
                    where: {
                        plate: plate,
                        vehicleStatus: 'active'
                    }
                });
                if (vehicle) {
                    await t.rollback();
                    return res.status(400).json({
                        status: false,
                        message: 'Vehicle already exist',
                        data: req.body
                    });
                }
                const data = await Vehicle.create({
                    driverId: req.driver.id,
                    ...req.body,
                    vehicleStatus: 'active'
                }, { transaction: t });
                await t.commit();
                return res.status(200).json({
                    status: true,
                    message: 'Vehicle has been added',
                    data: data
                });
            } catch (err) {
                await t.rollback();
                return res.status(500).json({
                    status: false,
                    message: err.message,
                    data: err.errors[0].message
                });
            }

        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message,
                data: null
            });
        }
    },
    getDriverVehicle: async (req, res) => {
        try {
            const data = await Vehicle.findAll({
                where: {
                    driverId: req.driver.id,
                    vehicleStatus: 'active'
                },
                attributes: {
                    exclude: ['driverId']
                }
            });
            return res.status(200).json({
                status: true,
                message: 'Data retrieved',
                data: data
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message,
                data: null
            });
        }
    },
    deleteVehicle: async (req, res) => {
        try {
            const { id } = req.params;
            let t = await sequelize.transaction();
            const vehicle = await Vehicle.findOne({
                where: {
                    id: id,
                    driverId: req.driver.id,
                    vehicleStatus: 'active'
                }
            }, { transaction: t });
            if (!vehicle) {
                return res.status(404).json({
                    status: false,
                    message: 'Vehicle not found',
                    data: null
                });
            }
            vehicle.vehicleStatus = 'inactive';
            await vehicle.save();
            await t.commit();
            return res.status(200).json({
                status: true,
                message: 'Vehicle has been deleted',
                data: vehicle
            });
        } catch (err) {
            await t.rollback();
            return res.status(500).json({
                status: false,
                message: err.message,
                data: null
            });
        }
    },
    addTrip: async (req, res) => {
        console.log(req.body);
        try {
            let {
                vehicleId,
                origin,
                destination,
                departure,
                arrival,
                price
            } = req.body;
            if (!vehicleId || !origin || !destination || !departure || !arrival || !price) {
                return res.status(400).json({
                    status: false,
                    message: 'All fields are required',
                    data: req.body
                });
            }
            if (origin === destination) {
                return res.status(400).json({
                    status: false,
                    message: 'origin and destination must be different',
                    data: req.body
                });
            }
            const vehicle = await Vehicle.findOne({
                where: {
                    id: vehicleId,
                    vehicleStatus: 'active'
                },
                attributes: ['seats']
            });
            if (!vehicle) {
                return res.status(404).json({
                    status: false,
                    message: 'Vehicle not found',
                    data: req.body
                });
            }
            departure = new Date(departure);
            departure.setHours(departure.getHours() + 7);
            arrival = new Date(arrival);
            arrival.setHours(arrival.getHours() + 7);
            if (departure > arrival) {
                return res.status(400).json({
                    status: false,
                    message: 'Departure must be less than arrival',
                    data: req.body
                });
            }
            // validate vehicle
            const trip = await Trip.findOne({
                where: {
                    vehicleId: vehicleId,
                    status: {
                        [Op.notIn]: ['completed', 'cancelled']
                    },
                    [Op.or]: [
                        {
                            departure: {
                                [Op.between]: [departure, arrival]
                            }
                        },
                        {
                            arrival: {
                                [Op.between]: [departure, arrival]
                            }
                        }
                    ]
                }
            });
            if (trip) {
                return res.status(400).json({
                    status: false,
                    message: 'Vehicle already booked',
                    data: req.body
                });
            }
            let t = await sequelize.transaction();
            try {
                const data = await Trip.create({
                    driverId: req.driver.id,
                    ...req.body,
                    departure: departure,
                    arrival: arrival,
                    seats: vehicle.seats,
                    status: 'ready'
                }, { transaction: t });
                await t.commit();
                return res.status(200).json({
                    status: true,
                    message: 'Trip has been added',
                    data: data
                });
            } catch (err) {
                await t.rollback();
                console.log(err);
                return res.status(500).json({
                    status: false,
                    message: 'Something went wrong',
                    data: {
                        insert_err: err.fields
                    }
                });
            }


        } catch (err) {
            console.log(err);
            return res.status(500).json({
                status: false,
                message: err.message,
                data: err
            });
        }
    },
    getDriverTrip: async (req, res) => {
        try {
            const { departure } = req.query

            const data = await Trip.findAll({
                where: {
                    driverId: req.driver.id,
                    departure: { [Op.startsWith]: departure }
                }
            });
            return res.status(200).json({
                status: true,
                message: 'Data retrieved',
                data: data
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message,
                data: null
            });
        }
    },
    deleteTrip: async (req, res) => {
        try {
            const { id } = req.params;
            let t = await sequelize.transaction();
            const trip = await Trip.findOne({
                where: {
                    id: id,
                    driverId: req.driver.id,
                    status: 'ready'
                }
            }, { transaction: t });
            if (!trip) {
                await t.rollback();
                return res.status(404).json({
                    status: false,
                    message: 'Trip not found',
                    data: null
                });
            }
            trip.status = 'cancelled';
            let reservation = await reservation.findAll({
                where: {
                    tripId: trip.id
                }
            }, { transaction: t });
            reservation.forEach(async (reserv) => {
                reserv.status = 'rejected';
                await reserv.save();
            });
            await trip.save();
            await t.commit();
            return res.status(200).json({
                status: true,
                message: 'Trip has been cancelled',
                data: trip
            });
        } catch (err) {
            await t.rollback();
            return res.status(500).json({
                status: false,
                message: err.message,
                data: null
            });
        }
    },
    updateTrip: async (req, res) => {
        try {
            const { tripId, status, description } = req.query;
            if (!tripId || !status) {
                return res.status(400).json({
                    status: false,
                    message: 'All fields are required',
                    data: req.query
                });
            }
            let t = await sequelize.transaction();
            const trip = await Trip.findOne({
                where: {
                    id: tripId,
                    driverId: req.driver.id,
                    status: { [Op.notIn]: ['completed', 'cancelled'] }
                }
            }, { transaction: t });
            if (!trip) {
                await t.rollback();
                return res.status(404).json({
                    status: false,
                    message: 'Trip not found',
                    data: null
                });
            }
            trip.status = status;
            trip.description = description;
            await trip.save();
            await t.commit();
            return res.status(200).json({
                status: true,
                message: 'Trip has been updated',
                data: trip
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message,
                data: null
            });
        }
    },
    findTrip: async (req, res) => {
        try {
            const { origin, destination, departure } = req.query;
            if (!origin || !destination || !departure) {
                return res.status(400).json({
                    status: false,
                    message: 'All fields are required',
                    data: req.query
                });
            }
            let routeCek = await Route.findOne({
                where: {
                    origin: origin,
                    destination: destination,
                },
                attributes: ['origin', 'destination', 'descriptionRoute', 'price']
            });
            if (!routeCek) {
                return res.status(404).json({
                    status: false,
                    message: 'Route not found',
                    data: null
                });
            }
            let matrixQuery = await Route.findAll({
                where: {
                    descriptionRoute: { [Op.substring]: routeCek.descriptionRoute },
                },
                attributes: ['origin', 'destination']
            });
            let originQuery = matrixQuery.map((item) => item.origin);
            let destinationQuery = matrixQuery.map((item) => item.destination);

            const data = await Trip.findAll({
                where: {
                    origin: { [Op.in]: originQuery },
                    destination: { [Op.in]: destinationQuery },
                    departure: { [Op.startsWith]: departure },
                    status: 'ready'
                }
            });
            if (data.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Trip not found',
                    data: null
                });
            }
            return res.status(200).json({
                status: true,
                message: 'Data retrieved',
                data: {
                    results: {
                        origin: routeCek.origin,
                        destination: routeCek.destination,
                        descriptionRoute: routeCek.descriptionRoute,
                        estimasiHarga: routeCek.price,
                    }, availableTrip: data,
                }
            });
        } catch (err) {
            return res.status(500).json({
                status: false,
                message: err.message,
                data: null
            });
        }
    }
};

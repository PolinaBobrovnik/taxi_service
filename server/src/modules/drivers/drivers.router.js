var router = require('express').Router();
var driversService = require('./drivers.service')();
var driversValidator = require('./drivers.validator')();

router.get('/', function(req, res, next) {
    driversService.getAll(function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.get('/cars/brands/', function(req, res, next) {
    driversService.getCarsBrands(function (err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});


router.get('/cars/models/:brandsId', function(req, res, next) {
    driversService.getCarsModels(req.params.brandsId, function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.get('/cars/:driversId', function(req, res, next) {
    driversService.getCarsByDriversId(req.params.driversId, function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);

    });
});

router.post('/cars/', function(req, res, next) {
    var validationErrors = driversValidator.validateCarsData(req);

    if (validationErrors) {
        res.status(400).send(validationErrors);
        return;
    }

    var car = {
        drivers_id: req.body.driversId,
        license_plate: req.body.licensePlate,
        color: req.body.color,
        manufacture_year: req.body.manufactureYear,
        cars_brands_id: req.body.carsBrandsId,
        cars_models_id: req.body.carsModelsId
    };

    driversService.addCar(car, function(err) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});

router.delete('/cars/:id', function(req, res, next) {
    driversService.deleteCar(req.params.id, function(err) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});

router.post('/rides/', function(req, res, next) {
    var validationErrors = driversValidator.validateRidesData(req);

    if (validationErrors) {
        res.status(400).send(validationErrors);
        return;
    }

    var ride = {
        cars_id: req.body.carsId,
        drivers_id: req.body.driversId,
        statuses_id: 1,
        routes_id: req.body.routesId,
        price: req.body.price,
        available_seats: req.body.availableSeats,
        departure_time: Date.parse(req.body.departureTime),
        arrival_time: Date.parse(req.body.arrivalTime)
    };

    driversService.insertRide(ride, function(err) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});

router.get('/rides/available/', function(req, res, next) {
    driversService.getAvailableRides(function(err, rows) {
        if (err) {
            return next(err);
        }

        if (rows.length !== 0) {
            res.status(200).send(rows.map(function(row) {
                row.arrivalTime = new Date(row.arrivalTime);
                row.departureTime = new Date(row.departureTime);

                return row;
            }));
        } else {
            res.status(200).send([]);
        }


    });
});

router.get('/rides/:driversId', function(req, res, next) {
    driversService.getRidesByDriversId(req.params.driversId, function(err, rows) {
        if (err) {
            return next(err);
        }

        if (rows.length !== 0) {
            res.status(200).send(rows.map(function(row) {
                row.arrivalTime = new Date(row.arrivalTime);
                row.departureTime = new Date(row.departureTime);

                return row;
            }));
        } else {
            res.status(200).send([]);
        }
    });
});

router.delete('/rides/:id', function(req, res, next) {
    driversService.deleteRide(req.params.id, function(err) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});

router.put('/rides/on-the-road/', function(req, res, next) {
    driversService.getRidesStatus(req.body.ridesId, function(err, rows) {
        if (err) {
            return next(err);
        }

        if (rows[0].statusesId !== 4) {
            driversService.updateRideAsOnTheRoad(req.body.ridesId, function (err) {
                if (err) {
                    return next(err);
                }

                res.sendStatus(200);
            });
        } else {
            res.sendStatus(500);
        }

    });
});

router.put('/rides/finished/', function(req, res, next) {
    driversService.updateRideAsFinished(req.body.ridesId, function (err) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});



module.exports = router;
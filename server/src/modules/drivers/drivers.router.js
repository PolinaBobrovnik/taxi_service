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

module.exports = router;
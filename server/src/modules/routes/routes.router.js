var router = require('express').Router();
var routesService = require('./routes.service')();
var routesValidator = require('./routes.validator')();

router.get('/points/', function (req, res, next) {
    routesService.getPoints(function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.get('/', function(req, res, next) {
    routesService.getRoutes(function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.get('/:id', function (req, res, next) {
    routesService.getRouteById(req.params.id, function (err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows[0]);
    });
});

router.post('/', function (req, res, next) {
    var validationErrors = routesValidator.validateRoute(req);

    if (validationErrors) {
        res.status(400).send(validationErrors);
        return;
    }

    var routesObj = {
        description: req.body.description,
        destinations_id: req.body.destinationsId,
        sources_id: req.body.sourcesId
    };

    routesService.addRoute(routesObj, function(err) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});

router.put('/', function (req, res, next) {
    var validationErrors = routesValidator.validateRoute(req);

    if (validationErrors) {
        res.status(400).send(validationErrors);
        return;
    }

    var routesObj = {
        description: req.body.description,
        destinations_id: req.body.destinationsId,
        sources_id: req.body.sourcesId
    };

    routesService.updateRoute(routesObj, req.body.routesId, function(err) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});


router.delete('/:id', function(req, res, next) {
    routesService.deleteRoute(req.params.id, function(err) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});

module.exports = router;
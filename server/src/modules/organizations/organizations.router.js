var router = require('express').Router();
var organizationsService = require('./organizations.service')();
var organizationsValidator = require('./organizations.validator')();

router.get('/', function(req, res, next) {
    organizationsService.getAll(function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.get('/comments/:organizationsId', function(req, res, next) {
    organizationsService.getCommentsByOrganizationsId(req.params.organizationsId, function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.delete('/comments/:commentsId', function(req, res, next) {
    organizationsService.deleteComment(req.params.commentsId, function(err, rows) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});

router.put('/drivers/', function(req, res, next) {
    var validationErrors = organizationsValidator.validateNewDriver(req);

    if (validationErrors) {
        res.status(400).send(validationErrors);
        return;
    }

    organizationsService.addDriver(req.body.organizationsId, req.body.driversId, function(err) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});

router.delete('/drivers/:driversId', function(req, res, next) {
    organizationsService.deleteDriver(req.params.driversId, function(err) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});

router.get('/drivers/without-organization/', function(req, res, next) {
    organizationsService.getDriversWithoutOrganization(function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.get('/drivers/:organizationsId', function(req, res, next) {
    organizationsService.getDriversByOrganizationsId(req.params.organizationsId, function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.put('/', function(req, res, next) {
    organizationsService.updateDescription(req.body.description, req.body.organizationsId, function(err) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});

module.exports = router;
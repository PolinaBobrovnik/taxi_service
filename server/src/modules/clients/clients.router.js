var router = require('express').Router();
var clientsService = require('./clients.service')();
var clientsValidator = require('./clients.validator')();

router.get('/', function(req, res, next) {
    clientsService.getAll(function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.get('/ratings/', function(req, res, next) {
    clientsService.getRatings(function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.get('/organizations/', function(req, res, next) {
    clientsService.getOrganizations(function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.get('/drivers/:organizationsId', function(req, res, next) {
    clientsService.getDriversByOrganizationsId(req.params.organizationsId, function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.post('/comment/', function (req, res, next) {
    var validationErrors = clientsValidator.validateComment(req);

    if (validationErrors) {
        res.status(400).send(validationErrors);
        return;
    }

    var commentObj = {
        comment: req.body.comment,
        clients_id: req.body.clientsId,
        drivers_id: req.body.driversId,
        organizations_id: req.body.organizationsId,
        ratings_id: req.body.ratingsId
    };

    clientsService.leaveComment(commentObj, function(err) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});

module.exports = router;
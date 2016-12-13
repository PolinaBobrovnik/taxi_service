var router = require('express').Router();
var organizationsService = require('./organizations.service')();

router.get('/', function(req, res, next) {
    organizationsService.getAll(function(err, rows) {
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
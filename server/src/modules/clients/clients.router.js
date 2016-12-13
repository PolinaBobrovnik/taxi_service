var router = require('express').Router();
var clientsService = require('./clients.service')();

router.get('/', function(req, res, next) {
    clientsService.getAll(function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

module.exports = router;
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

router.get('/ticket/payment-types/', function(req, res, next) {
    clientsService.getPaymentTypes(function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    })
});

router.get('/ticket/:clientsId' ,function(req, res, next) {
    clientsService.getTicketsByClientsId(req.params.clientsId, function (err, rows) {
        if (err) {
            return next(err);
        }

        if (rows.length !== 0) {
            res.status(200).send(rows.map(function(row) {
                row.departureTime = new Date(row.departureTime);

                return row;
            }));
        } else {
            res.status(200).send([]);
        }

    });
});

router.post('/ticket/', function(req, res, next) {
    var validationErrors = clientsValidator.validateTicket(req);

    if (validationErrors) {
        res.status(400).send(validationErrors);
        return;
    }
    var ticketObj = {
        rides_id: req.body.ridesId,
        payment_types_id: req.body.paymentTypesId,
        clients_id: req.body.clientsId
    };

    clientsService.bookTicket(ticketObj, function(err) {
        if (err) {
            return next(err);
        }

        clientsService.getAvailableSeats(req.body.ridesId, function(err, rows) {
            if (err) {
                return next(err);
            }

            var ridesObjForUpdating = {
                available_seats: --rows[0].availableSeats
            };

            if (ridesObjForUpdating.available_seats === 0) {
                ridesObjForUpdating.statuses_id = 2;
            }

            clientsService.updateRide(ridesObjForUpdating, req.body.ridesId, function(err) {
                if (err) {
                    return next(err);
                }

                res.sendStatus(200);
            });
        });
    });
});

router.delete('/ticket/:ticketsId/:ridesId', function(req, res, next) {
    clientsService.deleteTicket(req.params.ticketsId, function(err) {
        if (err) {
            return next(err);
        }

        clientsService.getAvailableSeats(req.params.ridesId, function(err, rows) {
            if (err) {
                return next(err);
            }

            var ridesObjForUpdating = {
                available_seats: ++rows[0].availableSeats
            };

            if (ridesObjForUpdating.available_seats === 1) {
                ridesObjForUpdating.statuses_id = 1;
            }

            clientsService.updateRide(ridesObjForUpdating, req.params.ridesId, function(err) {
                if (err) {
                    return next(err);
                }

                res.sendStatus(200);
            });
        });

    });
});

module.exports = router;
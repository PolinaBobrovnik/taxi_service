var router = require('express').Router();
var usersService = require('../services/users.service');

router.get('/', function(req, res) {
    usersService.getAll(function(err, rows) {
        if (err) {
            throw err
        }

        res.status(200).send(rows);
    });
});

router.get('/:id', function(req, res) {
    usersService.getById(req.params.id, function(err, rows) {
        if (err) {
            throw err;
        }

        res.status(200).send(rows);
    });
});

router.post('/', function(req, res) {
    var newUser = {
        username: req.body.username,
        password: req.body.password
    };

    usersService.add(newUser, function(err) {
        if (err) {
            throw err;
        }

        res.sendStatus(200);
    });
});

router.put('/', function(req, res) {
    var updatedUser = {
        username: req.body.username,
        password: req.body.password
    };

    usersService.update(updatedUser, req.body.id, function(err) {
        if (err) {
            throw err;
        }

        res.sendStatus(200);
    });
});

module.exports = router;
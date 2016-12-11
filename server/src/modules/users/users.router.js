var router = require('express').Router();
var usersService = require('./users.service')();
var usersValidator = require('./users.validator')();
var bcrypt = require('bcryptjs');

router.get('/', function(req, res, next) {
    usersService.getAll(function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.get('/:id', function(req, res, next) {
    if (req.url === '/roles/') {
        return next();
    }

    usersService.getOneById(req.params.id, function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.get('/roles/', function(req, res, next) {
    usersService.getRoles(function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.post('/', function(req, res, next) {
    var validationErrors = usersValidator.validate(req);

    if (validationErrors) {
        res.status(400).send(validationErrors);
        return;
    }

    var newUser = {
        roles_id: req.body.rolesId,
        username: req.body.username,
        name: req.body.firstname,
        last_name: req.body.lastname ? req.body.lastname : ''
    };

    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
           return next(err);
        }

        newUser.password = hash;

        usersService.addOne(newUser, function(err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send({newUserId: result.insertId});
        });
    });

});

router.put('/', function(req, res, next) {
    var validationErrors = usersValidator.validate(req);

    if (validationErrors) {
        res.status(400).send(validationErrors);
        return;
    }

    usersService.getPassword(req.body.id, function(err, rows) {
        if (err) {
            return next(err);
        }

        bcrypt.compare(req.body.oldPassword, rows[0].password, function(err, result) {
            if (err) {
                return next(err);
            }

            if (!result) {
                res.status(400).send([{msg: 'Invalid old password! Please, retype it.'}]);
                return;
            }

            var updatedUser = {
                username: req.body.username,
                last_name: req.body.lastname ? req.body.lastname : '',
                name: req.body.firstname,
            };

            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    return next(err);
                }

                updatedUser.password = hash;

                usersService.updateOne(updatedUser, req.body.id, function(err) {
                    if (err) {
                        return next(err);
                    }

                    res.sendStatus(200);
                });
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    usersService.deleteOneById(req.params.id, function(err) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});

module.exports = router;
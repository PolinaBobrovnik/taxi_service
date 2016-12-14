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

router.get('/emails/:usersId', function(req, res, next) {
    usersService.getEmails(req.params.usersId, function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.post('/emails/', function(req, res, next) {
    var validationErrors = usersValidator.validateEmail(req);

    if (validationErrors) {
        res.status(400).send(validationErrors);
        return;
    }

    var emailObj = {
        users_id: req.body.usersId,
        email: req.body.email
    };

    usersService.addEmail(emailObj, function(err) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});

router.delete('/emails/:id', function(req, res, next) {
    usersService.deleteEmail(req.params.id, function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.get('/phones/:usersId', function(req, res, next) {
    usersService.getPhones(req.params.usersId, function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.post('/phones/', function(req, res, next) {
    var validationErrors = usersValidator.validatePhoneNumber(req);

    if (validationErrors) {
        res.status(400).send(validationErrors);
        return;
    }

    var phoneObj = {
        users_id: req.body.usersId,
        number: req.body.phone
    };

    usersService.addPhone(phoneObj, function(err) {
        if (err) {
            return next(err);
        }

        res.sendStatus(200);
    });
});

router.delete('/phones/:id', function(req, res, next) {
    usersService.deletePhone(req.params.id, function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

router.post('/', function(req, res, next) {
    var validationErrors = usersValidator.validateUsersData(req);

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

            usersService.getOneById(result.insertId, function(err, rows) {
                if (err) {
                    return next(err);
                }

                function callback(err) {
                    if (err) {
                        return next(err);
                    }

                    res.sendStatus(200);
                }

                var entityObj = {
                    users_id: rows[0].id
                };

                switch (rows[0].role) {
                    case 'driver':
                        usersService.addDriver(entityObj, callback);
                        break;
                    case 'client':
                        usersService.addClient(entityObj, callback);
                        break;
                    case 'organization':
                        entityObj.description = '';
                        usersService.addOrganization(entityObj, callback);
                        break;
                    default:
                        throw new Error('There is not compatible role!');
                }
            });
        });
    });

});

router.put('/', function(req, res, next) {
    var validationErrors = usersValidator.validateUsersData(req);

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
    usersService.deleteOneById(req.params.id, function(err, rows) {
        if (err) {
            return next(err);
        }

        res.status(200).send(rows);
    });
});

module.exports = router;
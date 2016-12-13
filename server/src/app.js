var app = require('express')();
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var cors = require('cors');
var usersRouter = require('./modules/users/users.router');
var driversRouter = require('./modules/drivers/drivers.router');
var clientsRouter = require('./modules/clients/clients.router');
var organizationsRouter = require('./modules/organizations/organizations.router');

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(expressValidator());

app.use('/api/users', usersRouter);
app.use('/api/drivers', driversRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/organizations', organizationsRouter);


app.use(function(err, req, res, next) {
    res.status(500).send([{
        msg: err.message//errorsMessages.otherErrors.INTERNAL_SERVER_ERROR
    }]);
});

app.listen(3000, function() {
    console.log('Server has started!');
});
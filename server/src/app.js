var app = require('express')();
var usersRouter = require('./modules/users/users.router.js');
var errorsMessages = require('./utils/constants/errors-messages');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(expressValidator());

app.use('/api/users', usersRouter);

app.use(function(err, req, res, next) {
    res.status(500).send([{
        msg: err.message//errorsMessages.otherErrors.INTERNAL_SERVER_ERROR
    }]);
});

app.listen(3000, function() {
    console.log('Server has started!');
});
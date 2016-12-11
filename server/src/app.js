var app = require('express')();
var usersRouter = require('./modules/users/users.router');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());

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
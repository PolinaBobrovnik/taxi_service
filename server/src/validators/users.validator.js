var validator = require('express-validator');
var errorsMessages = require('../utils/constants/errors-messages');
var regularExpressions = require('../utils/constants/regular-expressions');

module.exports = {
    getValidationErros: function(req) {
        req.checkBody('username', errorsMessages.validationErrors.users.INVALID_USERNAME)
            .matches(regularExpressions.users.USERNAME);

        req.checkBody('password', errorsMessages.validationErrors.users.INVALID_PASSWORD)
            .matches(regularExpressions.users.PASSWORD);

        return req.getValidationErros();
    }
}
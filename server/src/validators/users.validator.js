var errorsMessages = require('../utils/constants/errors-messages');
var regularExpressions = require('../utils/constants/regular-expressions');

module.exports = {
    getValidationErrosDuringRegistration: function(req) {
        req.checkBody('username', errorsMessages.validationErrors.users.INVALID_USERNAME)
            .matches(regularExpressions.users.USERNAME);

        req.checkBody('password', errorsMessages.validationErrors.users.INVALID_PASSWORD)
            .matches(regularExpressions.users.PASSWORD);

        req.checkBody('confirmPassword', errorsMessages.validationErrors.users.NOT_SAME_PASSWORDS)
            .equals(req.body.password)
        return req.validationErrors();
    },
    getValidationErrorsDuringUpdating: function(req) {
        req.checkBody('id', errorsMessages.otherErrors.INTERNAL_SERVER_ERROR)
            .isNumeric();

        req.checkBody('newUsername', errorsMessages.validationErrors.users.INVALID_USERNAME)
            .matches(regularExpressions.users.USERNAME);

        req.checkBody('newPassword', errorsMessages.validationErrors.users.INVALID_PASSWORD)
            .matches(regularExpressions.users.PASSWORD);

        req.checkBody('confirmPassword', errorsMessages.validationErrors.users.NOT_SAME_PASSWORDS)
            .equals(req.body.newPassword);

        return req.validationErrors();
    }
};
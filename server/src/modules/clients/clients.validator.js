module.exports = function() {
    var INVALID_ORGANIZATIONS_ID = 'Organization has not chosen.';

    var INVALID_DRIVERS_ID = 'Driver has not chosen.';

    var INVALID_RATINGS_ID = 'Rating has not chosen.';

    var INVALID_COMMENT = 'Invalid comment! Should be no longer than 256 chars.';

    var INVALID_RIDES_ID = 'Ride has not chosen.';

    var INVALID_PAYMENT_TYPES_ID = 'Payment type has not chosen';

    return {
        validateComment: function(req) {
            req.checkBody('organizationsId', INVALID_ORGANIZATIONS_ID).notEmpty();

            req.checkBody('driversId', INVALID_DRIVERS_ID).notEmpty();

            req.checkBody('ratingsId', INVALID_RATINGS_ID).notEmpty();

            req.checkBody('comment', INVALID_COMMENT).isLength({max: 256});

            return req.validationErrors();
        },
        validateTicket: function (req) {
            req.checkBody('ridesId', INVALID_RIDES_ID).notEmpty();

            req.checkBody('paymentTypesId', INVALID_PAYMENT_TYPES_ID).notEmpty();

            return req.validationErrors();
        }
    }
};
module.exports = function() {
    var INVALID_DRIVERS_ID = 'Driver has not chosen.';

    return {
        validateNewDriver: function(req) {
            req.checkBody('driversId', INVALID_DRIVERS_ID).notEmpty();

            return req.validationErrors();
        }

    };
};
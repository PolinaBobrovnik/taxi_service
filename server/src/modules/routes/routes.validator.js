module.exports = function() {
    var INVALID_SOURCES_ID = 'Source has not chosen.';

    var INVALID_DESTINATIONS_ID = 'Destination has not chosen.';

    var INVALID_DESCRIPTION = 'Description should be no more than 256 chars';

    var EQUALS_SOURCE_AND_DESTINATION = 'Source and destination should have not the same values.';

    return {
        validateRoute: function(req) {
            req.checkBody('sourcesId', INVALID_SOURCES_ID).notEmpty();

            req.checkBody('destinationsId', INVALID_DESTINATIONS_ID).notEmpty();

            req.checkBody('description', INVALID_DESCRIPTION).isLength({max: 256});

            var validationErrors = req.validationErrors();

            if (req.body.sourcesId && req.body.destinationsId && req.body.sourcesId === req.body.destinationsId) {
                if (validationErrors) {
                    validationErrors.push({msg: EQUALS_SOURCE_AND_DESTINATION});
                } else {
                    validationErrors = [{msg: EQUALS_SOURCE_AND_DESTINATION}];
                }

            }

            return validationErrors;
        }
    }
};
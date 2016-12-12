module.exports = function() {
    var INVALID_COLOR = 'Invalid color! Should have no more than 45 chars.';

    var INVALID_MANUFACTURE_YEAR = 'Invalid manufacture year! Should be between 1970 and current year.';

    var INVALID_LICENSE_PLATE = 'Invalid license plate! Should have only digits and letters and have 5-10 chars length.';

    var INVALID_CARS_BRAND = 'Cars brands has not chosen.';

    var INVALID_CARS_MODELS = 'Cars models has not chosen';

    var LICENSE_PLATE_REGEX = '^[0-9a-zA-Z]{5,10}$';

    return {
        validateCarsData: function(req) {
            req.checkBody('carsBrandsId', INVALID_CARS_BRAND).notEmpty();

            req.checkBody('carsModelsId', INVALID_CARS_MODELS).notEmpty();

            req.checkBody('color', INVALID_COLOR).isLength({min: 3, max: 45});

            var currentYear =  new Date().getFullYear();
            req.checkBody('manufactureYear', INVALID_MANUFACTURE_YEAR).isInt({min: 1970, max: currentYear});

            req.checkBody('licensePlate', INVALID_LICENSE_PLATE).matches(LICENSE_PLATE_REGEX);

            return req.validationErrors();
        }
    }
};
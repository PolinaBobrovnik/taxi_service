module.exports = function() {
    var INVALID_COLOR = 'Invalid color! Should have no more than 45 chars.';

    var INVALID_MANUFACTURE_YEAR = 'Invalid manufacture year! Should be between 1970 and current year.';

    var INVALID_LICENSE_PLATE = 'Invalid license plate! Should have only digits and letters and have 5-10 chars length.';

    var INVALID_CARS_BRAND = 'Cars brands has not chosen.';

    var INVALID_CARS_MODELS = 'Cars models has not chosen.';

    var INVALID_ROUTES_ID = 'Route has not chosen.';

    var INVALID_CARS_ID = 'Car has not chosen.';

    var INVALID_PRICE = 'Invalid price! Should be positive number.';

    var INVALID_AVAILABLE_SEATS = 'Invalid available seats! Should have value between 3-25.';

    var INVALID_DEPARTURE_TIME = 'Invalid departure time! Retype it.';

    var INVALID_ARRIVAL_TIME = 'Invalid arrival time! Retype it.';

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
        },
        validateRidesData: function (req) {
            req.checkBody('routesId', INVALID_ROUTES_ID).notEmpty();

            req.checkBody('carsId', INVALID_CARS_ID).notEmpty();

            req.checkBody('price', INVALID_PRICE).isInt({min: 0});

            req.checkBody('availableSeats', INVALID_AVAILABLE_SEATS).isInt({min: 3, max: 25});

            req.checkBody('departureTime', INVALID_DEPARTURE_TIME).isDate();

            req.checkBody('arrivalTime', INVALID_ARRIVAL_TIME).isDate();

            var validationErrors = req.validationErrors();

            function areThereIncorrectTimeFileds(validationErrors) {
                var flag = false;

                for (var i = 0; i < validationErrors.length; i++) {
                    if (validationErrors[i].param === 'arrivalTime' ||
                        validationErrors[i].param === 'departureTime') {
                        flag = true;
                        break;
                    }
                }

                return flag;
            }

            if (!areThereIncorrectTimeFileds(validationErrors)) {
                var departureTime = Date.parse(req.body.departureTime);
                var arrivalTime = Date.parse(req.body.arrivalTime);
                var currentTime  = Date.now();

                var timeInThePastError = {msg: 'Time cannot be in the past.'};

                var departureBiggerThenArrivalError = {msg: 'Departure time bigger than arrival time.'};

                if (departureTime < currentTime || arrivalTime < currentTime) {
                    if (validationErrors) {
                        validationErrors.push(timeInThePastError);
                    } else {
                        validationErrors = [timeInThePastError];
                    }
                } else if (departureTime >= arrivalTime) {
                    if (validationErrors) {
                        validationErrors.push(departureBiggerThenArrivalError);
                    } else {
                        validationErrors = [departureBiggerThenArrivalError];
                    }
                }
            }


            return validationErrors;
        }
    }
};
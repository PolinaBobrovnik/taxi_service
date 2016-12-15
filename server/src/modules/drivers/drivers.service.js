var connection = require('../../utils/mysql-connection');

module.exports = function() {
    var selectAll = `
        SELECT
            d.id,
            u.name AS firstname,
            u.last_name AS lastname
        FROM drivers d
        JOIN users u
            ON d.users_id = u.id 
    `;

    var addCar = 'INSERT INTO cars SET ?';

    var deleteCar = 'DELETE FROM cars WHERE id = ?';

    var selectCarsBrands = 'SELECT id AS carsBrandsId, name AS carsBrandsName FROM cars_brands';

    var selectCarsModels = `
        SELECT 
            id AS carsModelsId, 
            name AS carsModelsName 
        FROM cars_models 
        WHERE cars_brands_id = ?
    `;

    var selectCarsByDriversId = `
        SELECT 
           c.id,
           cb.name AS carsBrandsName,
           cm.name AS carsModelsName,
           c.license_plate AS licensePlate,
           c.manufacture_year AS manufactureYear,
           c.color
        FROM cars c
        JOIN cars_brands cb
            ON cb.id = c.cars_brands_id
        JOIN cars_models cm
            ON cm.id = c.cars_models_id
        WHERE c.drivers_id = ?
    `;

    var insertRide = 'INSERT INTO rides SET ?';

    var selectRides = `
        SELECT
            rd.id,
            ps.name AS sourcesName,
            pd.name AS destinationsName,
            rd.price,
            rd.arrival_time AS arrivalTime,
            rd.departure_time AS departureTime,
            rd.available_seats AS availableSeats,
            s.status
        FROM rides rd
        JOIN routes r
            ON r.id = rd.routes_id
        JOIN points ps
            ON ps.id = r.sources_id
        JOIN points pd
            ON pd.id = r.destinations_id
        JOIN statuses s
            ON s.id = rd.statuses_id
        
    `;

    var selectRidesByDriversId = selectRides + 'WHERE rd.drivers_id = ?';

    var selectAvailableRides = selectRides + 'WHERE rd.statuses_id = 1';

    var deleteRide = 'DELETE FROM rides WHERE id = ?';

    var updateRideAsOnTheRoad = 'UPDATE rides SET statuses_id = 3 WHERE id = ?';

    var updateRideAsFinished = 'UPDATE rides SET statuses_id = 4 WHERE id = ?';

    var getRidesStatus = 'SELECT statuses_id AS statusesId FROM rides WHERE id = ?';

    return {
        getAll: function(callback) {
            connection.query(selectAll, callback);
        },
        addCar: function(car, callback) {
            connection.query(addCar,[car], callback);
        },
        deleteCar: function(id, callback) {
            connection.query(deleteCar, [id], callback);
        },
        getCarsBrands: function(callback) {
            connection.query(selectCarsBrands, callback);
        },
        getCarsModels: function(brandsId, callback) {
            connection.query(selectCarsModels, [brandsId], callback);
        },
        getCarsByDriversId: function(driversId, callback) {
            connection.query(selectCarsByDriversId, [driversId], callback);
        },
        insertRide: function(ride, callback) {
            connection.query(insertRide, [ride], callback);
        },
        getRidesByDriversId: function(driversId, callback) {
            connection.query(selectRidesByDriversId,[driversId], callback);
        },
        getAvailableRides: function(callback) {
            connection.query(selectAvailableRides, callback);
        },
        deleteRide: function(ridesId, callback) {
            connection.query(deleteRide, [ridesId], callback);
        },
        getRidesStatus: function(ridesId, callback) {
            connection.query(getRidesStatus, [ridesId], callback);
        },
        updateRideAsOnTheRoad: function(ridesId, callback) {
            connection.query(updateRideAsOnTheRoad, [ridesId], callback);
        },
        updateRideAsFinished: function(ridesId, callback) {
            connection.query(updateRideAsFinished, [ridesId], callback);
        }

    }
};
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
        }
    }
};
var connection = require('../../utils/mysql-connection');

module.exports = function() {
    var insertRoute = 'INSERT INTO routes SET ?';

    var selectRoutes = `
        SELECT
            r.id, 
            ps.name AS sourcesName,
            ps.address AS sourcesAddress,
            pd.name AS destinationsName,
            pd.address AS destinationsAddress,
            r.description,
            r.sources_id AS sourcesId,
            r.destinations_id AS destinationsId
        FROM routes r
        JOIN points ps
            ON ps.id = r.sources_id
        JOIN points pd
            ON pd.id = r.destinations_id
    `;

    var selectPoints = 'SELECT * FROM points';

    var deleteRoute = 'DELETE FROM routes WHERE id = ?';

    var updateRoute = 'UPDATE routes SET ? WHERE id = ?';

    var selectRouteById = `
        SELECT
            description,
            sources_id AS sourcesId,
            destinations_id AS destinationsId
        FROM routes
        WHERE id = ?        
    `;

    return {
        addRoute: function(routesObj, callback) {
            connection.query(insertRoute, [routesObj], callback);
        },
        getRoutes: function(callback) {
            connection.query(selectRoutes, callback);
        },
        getPoints: function(callback) {
            connection.query(selectPoints, callback);
        },
        deleteRoute: function(routesId, callback) {
            connection.query(deleteRoute, [routesId], callback);
        },
        updateRoute: function(routesObj, id, callback) {
            connection.query(updateRoute, [routesObj, id], callback);
        },
        getRouteById: function(id, callback) {
            connection.query(selectRouteById, [id], callback);
        }
    };
};
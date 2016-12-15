var connection = require('../../utils/mysql-connection');

module.exports = function() {
    var selectAll = `
        SELECT
            c.id,
            u.name AS firstname,
            u.last_name AS lastname
        FROM clients c
        JOIN users u
            ON u.id = c.users_id
    `;

    var insertComment = 'INSERT INTO comments SET ?';

    var selectRatings = 'SELECT id, rating FROM ratings';

    var selectOrganizations = `
        SELECT
            o.id,
            u.name AS organizationsName
        FROM organizations o
        JOIN users u
            ON u.id = o.users_id
    `;

    var selectDriversByOrganizationsId = `
        SELECT
            d.id,
            u.name AS firstname,
            u.last_name AS lastname
        FROM drivers d
        JOIN users u
            ON u.id = d.users_id
        WHERE d.organizations_id = ?
    `;

    var insertTicket = 'INSERT INTO tickets SET ?';

    var selectRidesAvailableSeats = 'SELECT available_seats AS availableSeats FROM rides WHERE id = ?';

    var updateRide = 'UPDATE rides SET ? WHERE id = ?';

    var deleteTicket = 'DELETE FROM tickets WHERE id = ?';

    var selectTicketsByClientsId = `
        SELECT
            t.id,
            t.rides_id AS ridesId,
            ps.name AS sourcesName,
            pd.name AS destinationsName,
            pt.type AS paymentType,
            rd.departure_time AS departureTime
        FROM tickets t
        JOIN payment_types pt
           ON  pt.id = t.payment_types_id
        JOIN rides rd
            ON rd.id = t.rides_id
        JOIN routes r
            ON r.id = rd.routes_id
        JOIN points ps
            ON ps.id = r.sources_id
        JOIN points pd
            ON pd.id = r.destinations_id
        WHERE t.clients_id = ?
    `;

    var selectPaymentTypes = 'SELECT * FROM payment_types';

    return {
        getAll: function(callback) {
            connection.query(selectAll, callback);
        },
        leaveComment: function(entityObj, callback) {
            connection.query(insertComment, [entityObj], callback);
        },
        getRatings: function(callback) {
            connection.query(selectRatings, callback);
        },
        getOrganizations: function(callback) {
            connection.query(selectOrganizations, callback);
        },
        getDriversByOrganizationsId: function(organizationsId, callback) {
            connection.query(selectDriversByOrganizationsId, [organizationsId], callback);
        },
        bookTicket: function(entityObj, callback) {
            connection.query(insertTicket, [entityObj], callback);
        },
        getAvailableSeats: function(ridesId, callback) {
            connection.query(selectRidesAvailableSeats, [ridesId], callback);
        },
        updateRide: function(entityObj, ridesId, callback) {
            connection.query(updateRide, [entityObj, ridesId], callback);
        },
        deleteTicket: function(ticketsId, callback) {
            connection.query(deleteTicket, [ticketsId], callback);
        },
        getTicketsByClientsId: function(clientsId, callback) {
            connection.query(selectTicketsByClientsId, [clientsId], callback);
        },
        getPaymentTypes: function(callback) {
            connection.query(selectPaymentTypes, callback);
        }
    };
};
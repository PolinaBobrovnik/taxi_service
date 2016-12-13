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
        }
    };
};
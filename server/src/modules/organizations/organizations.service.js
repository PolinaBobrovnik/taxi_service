var connection = require('../../utils/mysql-connection');

module.exports = function() {
    var selectAll = `
        SELECT
           o.id,
           u.name AS organizationsName,
           o.description
        FROM organizations o
        JOIN users u
            ON u.id = o.users_id     
    `;

    var updateDescription = 'UPDATE organizations SET description = ? WHERE id = ?';
    
    var addDriver = 'UPDATE drivers SET organizations_id = ? WHERE id = ?';
    
    var selectDriversWithoutOrganization = `
        SELECT
            d.id,
            u.name AS firstname,
            u.last_name AS lastname
        FROM drivers d
        JOIN users u
            ON d.users_id = u.id
        WHERE d.organizations_id  IS NULL
    `;

    var deleteDriver = 'UPDATE drivers SET organizations_id = NULL WHERE id = ?';

    var selectOrganizationsDrivers = `
        SELECT
            d.id,
            u.name AS firstname,
            u.last_name AS lastname
        FROM drivers d
        JOIN users u
        ON d.users_id = u.id
        WHERE d.organizations_id = ?
    `;

    return {
        getAll: function(callback) {
            connection.query(selectAll, callback);
        },
        updateDescription: function(description, id,  callback) {
            connection.query(updateDescription, [description, id], callback);
        },
        getDriversWithoutOrganization: function(callback) {
            connection.query(selectDriversWithoutOrganization, callback);
        },
        addDriver: function (organizationsId, driversId, callback) {
            connection.query(addDriver, [organizationsId, driversId], callback);
        },
        deleteDriver: function(driversId, callback) {
            connection.query(deleteDriver, [driversId], callback);
        },
        getDriversByOrganizationsId: function(organizationId, callback) {
            connection.query(selectOrganizationsDrivers, [organizationId], callback);
        }
    }
};
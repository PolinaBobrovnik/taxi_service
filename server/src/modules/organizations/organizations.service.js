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

    var selectCommentsByOrganizationsId = `
        SELECT
            com.id,
            com.comment,
            r.rating,
            ud.name AS driversFirstname,
            ud.last_name AS driversLastname,
            uc.username AS clientsUsername
        FROM comments com
        JOIN ratings r
            ON r.id = com.ratings_id
        JOIN drivers d
            ON d.id = com.drivers_id
        JOIN users ud
            ON ud.id = d.users_id
        JOIN clients c
            ON c.id = com.clients_id
        JOIN users uc
            ON uc.id = c.users_id
        WHERE com.organizations_id = ?
    `;

    var deleteComment = 'DELETE FROM comments WHERE id = ?';

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
        getDriversByOrganizationsId: function(organizationsId, callback) {
            connection.query(selectOrganizationsDrivers, [organizationsId], callback);
        },
        getCommentsByOrganizationsId: function(organizationsId, callback) {
            connection.query(selectCommentsByOrganizationsId, [organizationsId], callback);
        },
        deleteComment: function(commentsId, callback) {
            connection.query(deleteComment, [commentsId], callback);
        }
    }
};
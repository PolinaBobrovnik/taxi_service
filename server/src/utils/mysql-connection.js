var mysql = require('mysql');

module.exports = mysql.createConnection({
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: 'taxi_service'
});

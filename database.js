const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'pass',
    password : 'somepass',
    database : 'todoList'
});


function connectDb() {
    connection.connect();
    connection.query('SELECT * FROM todo', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results);
    });
}


module.exports = {
    connectDb
};
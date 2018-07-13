function SendtodoList(connection,data){
    connection.query('SELECT * FROM project', function (error, results, fields) {
        if (error) {throw error;}
        data(results);
    });
}
module.exports = {
    SendtodoList
}
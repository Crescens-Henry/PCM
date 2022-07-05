const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user:'root',
    database: 'base_despacho'
})

connection.connect(function(err){
if (err){
    console.log("Error al conectar")
    console.log(err.code);
    console.log(err.fatal);
}
else
    console.log("Conexion Exitosa");
    
})

module.exports = connection;
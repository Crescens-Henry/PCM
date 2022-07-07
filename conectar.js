const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user:'root',
    database: 'base_despacho'
    
})

connection.connect((err)=>{
if (err){
    console.log("Error al conectar")
    console.log(err.code);
    return;
}
else
    console.log("Conexion Exitosa");
    
})

module.exports = connection;
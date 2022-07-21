const mysql = require('mysql2');//CONECCION CON LA LIBRERIA MYSQL

const connection = mysql.createConnection({//CONSTANTE PARA LA CONEXION A LA BASE DE DATOS
    host: '127.0.0.1',
    user:'root',
    database: 'base_despacho'
    
})
//VARIABLE CONEXION
connection.connect((err)=>{
if (err){//EN CASO DE ERROR
    console.log("Error al conectar")
    console.log(err.code);
    return;
}
else//EN CASO CONTRARIO
    console.log("Conexion Exitosa");
    
})

module.exports = connection;
const conexion = require('../conectar.js');

const RegistrarContador =()=>{
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var rango = document.getElementById("rango").value;
    var password = document.getElementById("password").value;
//Instruccion SQL
        $query = `INSERT INTO contador (id_contador,nombre,apellido,rango,contraseña) VALUES ('','${nombre}','${apellido}','${rango}','${password}')`;
        conexion.query($query, function (err) {
            if (err) {
                console.log("error en el query");
                console.log(err);
                return;
            }
            else { alert("Datos guardados") }
        });
}

const RegistrarCliente =()=>{
    var nombre = document.getElementById("nombreCliente").value;
    var rfc = document.getElementById("claveRFC").value;
    var tipo = document.getElementById("tipo").value;
    var numCuenta = document.getElementById("numCuenta").value;
    var documentos = document.getElementById("documentos").value;
//Instruccion SQL
        $query = `INSERT INTO cliente (id_cliente,nombre,rfc,tipo,cuentaBancaria,docs) VALUES ('','${nombre}','${rfc}','${tipo}','${numCuenta}','${documentos}')`;
        conexion.query($query, function (err) {
            if (err) {
                console.log("error en el query");
                console.log(err);
                return;
            }
            else { alert("Datos guardados") }
        });
}


const ConsultarCarpetas=()=>{//! metodo de consulta -- importante!

$query = 'Select * from carpeta;';// instruccion SQL
let tablaR = document.getElementById("table");
conexion.query($query, function (err, rows) {
    if (err) {
        console.log("error en el query");
        console.log(err);
        return;
    }
    else{
        //*lo que se extrae de la BD, queda guardado en ROWS que se vuelve lista de objetos
        var long = rows.length;// se obtiene el tamano de la lista
        for (i = 0; i < long; i++) {
            var newRow = tablaR.insertRow(-1);
            var celdaNombre = newRow.insertCell(0);
            var celdaClave = newRow.insertCell(1);
            var celdaDocumentos = newRow.insertCell(2);
            var celdaTipo = newRow.insertCell(3);
            var celdaContador = newRow.insertCell(4);
            var celdaCuentaBancaria = newRow.insertCell(5);

            var textoNombre = document.createTextNode(rows[i].nombre);
            var textClave = document.createTextNode(rows[i].id_carpeta);
            var textDocumentos = document.createTextNode(rows[i].Nombre);
            var textTipo = document.createTextNode(rows[i].Nombre);
            var textContador = document.createTextNode(rows[i].Nombre);
            var textCuentaBancaria = document.createTextNode(rows[i].Nombre);
            
            celdaId.appendChild(textoId);
            celdaUsuario.appendChild(textUsuario);
        }
        //alert(cadena)
    }
})}



function Buscar(){
    var nombre=document.getElementById("userSearch").value;
    $query=`select *from Usuarios where Nombre ='${nombre}';`

    let tablaR= document.getElementById("table2");
    conexion.query($query, function (err, rows) {
    if (err) {
    console.log("error en el query");
    console.log(err);
    return;
    }
    else{
    //Lo que se extrae de la BD, queda guardado en ROWS que se vuelve una lista de objetos
    var long = rows.length;//Se obtiene el tamaño de la lista
    for(i=0 ; i<long ; i++){//Se utiliza para recorrer la lista
    //cadena += rows[i].id + ' ' + rows[i].nombre +  ' ' + rows[i].contraseña +'\n';//Registro
    var newRow= tablaR.insertRow(-1);
    var celdaId= newRow.insertCell(0);
    var celdaUsuario= newRow.insertCell(1);
    var textoId = document.createTextNode(rows[i].Id_Usuario);
    var textoUsuario = document.createTextNode(rows[i].Nombre);
    celdaId.appendChild(textoId);
    celdaUsuario.appendChild(textoUsuario);
    }
    //alert(cadena);
    }});
}
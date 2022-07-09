const conexion = require('../conectar.js');

const RegistrarContador = () => {
    var nombre = document.getElementById("nombre").value;
    var rango = document.getElementById("rango").value;
    var password = document.getElementById("password").value;
    //Instruccion SQL
    $query = `INSERT INTO contador (id_contador,nombreComContador,rango,contraseña) 
    VALUES ('','${nombre}','${rango}','${password}')`;
    conexion.query($query, function (err) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        } else {
            alert("Datos guardados")
        }
    });
}
const RegistrarCliente = () => {
    var nombre = document.getElementById("nombreCliente").value;
    var rfc = document.getElementById("claveRFC").value;
    var tipo = document.getElementById("tipo").value;
    //Instruccion SQL
    //! debemo extraer por defecto el id de contador para que se asigne automaticamente a usuario cliente
    $query = `INSERT INTO cliente (id_cliente,nombre,rfc,tipo) VALUES ('','${nombre}','${rfc}','${tipo}')`;
    conexion.query($query, function (err) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        } else {
            alert("Datos guardados")
        }
    });
}
const RegistrarPalabras = () => {
    var palabra = document.getElementById("palabra").value;
    var concepto = document.getElementById("concepto").value;
    //  Instruccion SQL
    $query = `INSERT INTO diccionario (palabra,concepto) VALUES ('${palabra}','${concepto}')`;
    conexion.query($query, function (err) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        } else {
            alert("Datos guardados")
        }
    });
}
const ConsultarCarpetas = () => { //! metodo de consulta -- importante!

    $query = `SELECT cliente.nombreComCliente, cliente.rfc, cliente.tipo, contador.nombreComContador,carpeta.descDocumentos, carpeta.cuentaBancaria  FROM carpeta INNER JOIN cliente ON carpeta.cliente_id_cliente = cliente.id_cliente INNER JOIN contador ON cliente.contador_id_contador = contador.id_contador;
`;
 // instruccion SQL
    let tablaCarpetas = document.getElementById("table");
    conexion.query($query, function (err, rows) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        } else {//! resultado en pantalla
            //*lo que se extrae de la BD, queda guardado en ROWS que se vuelve lista de objetos
            var long = rows.length; // se obtiene el tamano de la lista
            for (i = 0; i < long; i++) {
                var newRow = tablaCarpetas.insertRow(-1);
                var celdaNombreCliente = newRow.insertCell(0);
                var celdaClave = newRow.insertCell(1);
                var celdaDocumentos = newRow.insertCell(2);
                var celdaTipo = newRow.insertCell(3);
                var celdaNombreContador = newRow.insertCell(4);
                var celdaCuenta = newRow.insertCell(5);

                var textoNombre = document.createTextNode(rows[i].nombreComCliente);
                var textClave = document.createTextNode(rows[i].rfc);
                var textDocumentos = document.createTextNode(rows[i].tipo);
                var textTipo = document.createTextNode(rows[i].nombreComContador);
                var textContador = document.createTextNode(rows[i].descDocumentos);
                var textCuentaBancaria = document.createTextNode(rows[i].cuentaBancaria);

                celdaNombreCliente.appendChild(textoNombre);
                celdaClave.appendChild(textClave);
                celdaDocumentos.appendChild(textDocumentos);
                celdaTipo.appendChild(textTipo);
                celdaNombreContador.appendChild(textContador);
                celdaCuenta.appendChild(textCuentaBancaria);
            }
            //alert(cadena)
        }
    })
}

document.addEventListener('DOMContentLoaded', ConsultarCarpetas,false)// inicializa la tabla

const ConsultarDiccionario = () =>{
    
//var cadena;
$query = 'select * FROM diccionario;';// instruccion SQL
let tablaDiccionario = document.getElementById("tableDiccionario");
conexion.query($query, function (err, rows) {
    if (err) {
        console.log("error en el query");
        console.log(err);
        return;
    }
    else{
        //lo que se extrae de la BD, queda guardado en ROWS que se vuelve lista de objetos
        var long = rows.length;// se obtiene el tamano de la lista
        for (i = 0; i < long; i++) {
            var newRowDiccionarnio = tablaDiccionario.insertRow(-1);
            var celdaPalabra = newRowDiccionarnio.insertCell(0);
            var celdaConcepto = newRowDiccionarnio.insertCell(1);
            var textoPalabra = document.createTextNode(rows[i].palabra);
            var textConcepto = document.createTextNode(rows[i].concepto);

            celdaPalabra.appendChild(textoPalabra);
            celdaConcepto.appendChild(textConcepto);
        }
        //alert(cadena)
    }
})
}
document.addEventListener('DOMContentLoaded', ConsultarDiccionario,false)// inicializa la tabla


function Buscar() {
    var rfc = document.getElementById("userSearch").value;
    $query = `SELECT cliente.nombreCom, cliente.rfc, cliente.tipo, contador.nombreCom, carpeta.cuentaBancaria, carpeta.descDocumentos FROM carpeta INNER JOIN cliente ON carpeta.cliente_id_cliente = cliente.id_cliente INNER JOIN contador ON cliente.contador_id_contador = contador.id_contador where rfc ='${rfc}';`
    //SELECT cliente.nombreCom, cliente.rfc, cliente.tipo, contador.nombreCom, carpeta.cuentaBancaria, carpeta.descDocumentos FROM carpeta INNER JOIN cliente ON carpeta.cliente_id_cliente = cliente.id_cliente INNER JOIN contador ON cliente.contador_id_contador = contador.id_contador;
    let tablaR = document.getElementById("table2");
    conexion.query($query, function (err, rows) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        } else {
            //Lo que se extrae de la BD, queda guardado en ROWS que se vuelve una lista de objetos
            var long = rows.length; //Se obtiene el tamaño de la lista
            for (i = 0; i < long; i++) { //Se utiliza para recorrer la lista
                //cadena += rows[i].id + ' ' + rows[i].nombre +  ' ' + rows[i].contraseña +'\n';//Registro
                var newRow = tablaR.insertRow(-1);
                var celdaNombreCiente = newRow.insertCell(0);
                var celdaRFC = newRow.insertCell(1);
                var textoId = document.createTextNode(rows[i].Id_Usuario);
                var textoUsuario = document.createTextNode(rows[i].Nombre);
                celdaId.appendChild(textoId);
                celdaUsuario.appendChild(textoUsuario);
            }
            //alert(cadena);
        }
    });
}
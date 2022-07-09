const conexion = require('../conectar.js');

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


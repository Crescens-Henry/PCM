const conexion = require('../conectar.js');
const btnBuscar=document.querySelector('#BuscarBoton');
const {default: Swal} = require('sweetalert2');


const ConsultarCarpetas = () => { //* listo

    let query = `SELECT * FROM ConsultarCarpeta;`;
 // instruccion SQL
    let tablaCarpetas = document.getElementById("table");
    conexion.query(query, function (err, rows) {
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
                var textTipo = document.createTextNode(rows[i].descDocumentos);
                var textContador = document.createTextNode(rows[i].nombreComContador);
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

ConsultarCarpetas();

btnBuscar.addEventListener('click',()=>{
    let rfc = document.getElementById('rfcSearch').value;
    let query = `SELECT * FROM ConsultarCarpeta WHERE rfc='${rfc}';`;
 // instruccion SQL
    let tablaCarpetas = document.getElementById("table");
    tablaCarpetas.innerHTML='';
    conexion.query(query, function (err, rows) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        } else if (rows.length == 0) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'RFC no encontrado'

        })  
        } else{//! resultado en pantalla
            //*lo que se extrae de la BD, queda guardado en ROWS que se vuelve lista de objetos
            var newRow = tablaCarpetas.insertRow(-1);
                var celdaNombreCliente = newRow.insertCell(0);
                var celdaClave = newRow.insertCell(1);
                var celdaDocumentos = newRow.insertCell(2);
                var celdaTipo = newRow.insertCell(3);
                var celdaNombreContador = newRow.insertCell(4);
                var celdaCuenta = newRow.insertCell(5);
                
                var textoNombre = document.createTextNode(rows[0].nombreComCliente);
                var textClave = document.createTextNode(rows[0].rfc);
                var textDocumentos = document.createTextNode(rows[0].tipo);
                var textTipo = document.createTextNode(rows[0].descDocumentos);
                var textContador = document.createTextNode(rows[0].nombreComContador);
                var textCuentaBancaria = document.createTextNode(rows[0].cuentaBancaria);

                celdaNombreCliente.appendChild(textoNombre);
                celdaClave.appendChild(textClave);
                celdaDocumentos.appendChild(textDocumentos);
                celdaTipo.appendChild(textTipo);
                celdaNombreContador.appendChild(textContador);
                celdaCuenta.appendChild(textCuentaBancaria);
        }
    })
});
const conexion = require('../conectar.js'); //CONEXION A BASE DE DATOS
const btnBuscar = document.querySelector('#BuscarBoton'); //CREACION DE VARIABLE PARA BORON BUSCAR EN HTML
const {
    default: Swal
} = require('sweetalert2'); //LIBRERIA POPPOP´S

/*FUNCION PRA VER LAS CARPETAS DE LOS CLIENTES */
const ConsultarCarpetas = () => { //* listo
    let query = `SELECT * FROM ConsultarCarpeta;`;
    // instruccion SQL
    let tablaCarpetas = document.getElementById("table");
    conexion.query(query, function (err, rows) {
        if (err) { //INSTRUCCION EN CASO DE ERROR
            console.log("error en el query");
            console.log(err);
            return;
        } else { // resultado en pantalla
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
                var celdaLocalizacion = newRow.insertCell(6);

                var textoNombre = document.createTextNode(rows[i].nombreComCliente);
                var textClave = document.createTextNode(rows[i].rfc);
                var textDocumentos = document.createTextNode(rows[i].tipo);
                var textTipo = document.createTextNode(rows[i].descDocumentos);
                var textContador = document.createTextNode(rows[i].nombreComContador);
                var textCuentaBancaria = document.createTextNode(rows[i].cuentaBancaria);
                var textLocalizacion = document.createTextNode(rows[i].localizacion);

                celdaNombreCliente.appendChild(textoNombre);
                celdaClave.appendChild(textClave);
                celdaDocumentos.appendChild(textDocumentos);
                celdaTipo.appendChild(textTipo);
                celdaNombreContador.appendChild(textContador);
                celdaCuenta.appendChild(textCuentaBancaria);
                celdaLocalizacion.appendChild(textLocalizacion);
            }
            //alert(cadena)
        }
    })
}
//RECARGA DE LA TABLA
ConsultarCarpetas();
/*BOTON BUSCAR PARA LAS CARPETAS */
btnBuscar.addEventListener('click', () => {
    let rfc = document.getElementById('rfcSearch').value;
    let query = `SELECT * FROM ConsultarCarpeta WHERE rfc='${rfc}';`;
    // instruccion SQL
    let tablaCarpetas = document.getElementById("table");
    tablaCarpetas.innerHTML = ''; //SE VACIA LA TABLA QUE SE MUESTRA
    conexion.query(query, function (err, rows) {
        if (err) { //INTRUCCION EN CASO DE ERROR
            console.log("error en el query");
            console.log(err);
            return;
        } else if (rows.length == 0) { //EN CASO DE NO ENCONTRAR EL RFC   
            //INICIO POP          
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

            //FIN POP        
        } else { //! resultado en pantalla
            //*lo que se extrae de la BD, queda guardado en ROWS que se vuelve lista de objetos
            var newRow = tablaCarpetas.insertRow(-1);
            var celdaNombreCliente = newRow.insertCell(0);
            var celdaClave = newRow.insertCell(1);
            var celdaDocumentos = newRow.insertCell(2);
            var celdaTipo = newRow.insertCell(3);
            var celdaNombreContador = newRow.insertCell(4);
            var celdaCuenta = newRow.insertCell(5);
            var celdaLocalizacion = newRow.insertCell(6);

            var textoNombre = document.createTextNode(rows[0].nombreComCliente);
            var textClave = document.createTextNode(rows[0].rfc);
            var textDocumentos = document.createTextNode(rows[0].tipo);
            var textTipo = document.createTextNode(rows[0].descDocumentos);
            var textContador = document.createTextNode(rows[0].nombreComContador);
            var textCuentaBancaria = document.createTextNode(rows[0].cuentaBancaria);
            var textLocalizacion = document.createTextNode(rows[0].localizacion);

            celdaNombreCliente.appendChild(textoNombre);
            celdaClave.appendChild(textClave);
            celdaDocumentos.appendChild(textDocumentos);
            celdaTipo.appendChild(textTipo);
            celdaNombreContador.appendChild(textContador);
            celdaCuenta.appendChild(textCuentaBancaria);
            celdaLocalizacion.appendChild(textLocalizacion);
        }
    })
});
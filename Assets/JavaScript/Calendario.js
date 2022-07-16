const conexion = require('../conectar.js');
const btnFecha = document.querySelector('#btnBuscarFecha');
const {default: Swal} = require('sweetalert2');


const ConsultarCalendario = () => {
    //var cadena;
    $query = 'Select cliente.nombreComCliente, cliente.rfc, calendario.fechaDeclaracion from cliente join calendario on calendario.cliente_id_cliente=cliente.id_cliente'; // instruccion SQL
    let tablaCalendario = document.getElementById("tableConsultar");
    conexion.query($query, function (err, rows) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        } else {
            //lo que se extrae de la BD, queda guardado en ROWS que se vuelve lista de objetos
            var long = rows.length; // se obtiene el tamano de la lista
            for (i = 0; i < long; i++) {
                var newRowCalendario = tablaCalendario.insertRow(-1);
                var celdaNombre = newRowCalendario.insertCell(0);
                var celdaRfc = newRowCalendario.insertCell(1);
                var celdaFecha = newRowCalendario.insertCell(2);

                var textoNombre = document.createTextNode(rows[i].nombreComCliente);
                var textoRfc = document.createTextNode(rows[i].rfc);
                var textoFecha = document.createTextNode(rows[i].fechaDeclaracion);

                celdaNombre.appendChild(textoNombre);
                celdaRfc.appendChild(textoRfc);
                celdaFecha.appendChild(textoFecha);
            }
            //alert(cadena)
        }
    })
}
ConsultarCalendario();
//Boton buscar fecha
btnFecha.addEventListener('click', () => {
    let nombre = document.getElementById('nombreSearch').value;
    console.log(nombre);
    let query = `Select cliente.nombreComCliente, cliente.rfc, calendario.fechaDeclaracion from cliente join calendario on calendario.cliente_id_cliente=cliente.id_cliente where nombreComCliente='${nombre}'`;
    // instruccion SQL
    let tablaCalendario = document.getElementById("tableConsultar");
    tablaCalendario.innerHTML = '';
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
                title: 'Usuario no encontrado'

            })
        } else { //! resultado en pantalla
            //*lo que se extrae de la BD, queda guardado en ROWS que se vuelve lista de objetos
            var newRowCalendario = tablaCalendario.insertRow(-1);
            var celdaNombre = newRowCalendario.insertCell(0);
            var celdaRfc = newRowCalendario.insertCell(1);
            var celdaFecha = newRowCalendario.insertCell(2);

            var textoNombre = document.createTextNode(rows[0].nombreComCliente);
            var textoRfc = document.createTextNode(rows[0].rfc);
            var textoFecha = document.createTextNode(rows[0].fechaDeclaracion);

            celdaNombre.appendChild(textoNombre);
            celdaRfc.appendChild(textoRfc);
            celdaFecha.appendChild(textoFecha);
        }
    })
});
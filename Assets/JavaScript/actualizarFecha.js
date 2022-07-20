const conexion = require('../conectar.js');// llamada a js de conexion a BSD
const {
    default: Swal
} = require('sweetalert2');// Llamada a la libreria para los pop pups

// funcion de actualizacion de fecha para usuario cliente
function actualizarFecha() {
    let nombreCliente = document.getElementById("Cliente").value;
    let fechaActualizada = document.getElementById("Nueva_fecha").value;
    console.log(fechaActualizada);
    $temp = `select id_cliente from cliente where nombreComCliente = '${nombreCliente}'`; //revisar bien esta linea 

    conexion.query($temp, function (err, rows) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        } else {
            var long = rows.length;
            for (i = 0; i < long; i++) {
                var valorId = Number(rows[0].id_cliente);

                console.log(valorId);
                //Instruccion SQL
                $query = `UPDATE calendario SET fechaDeclaracion='${fechaActualizada}' where cliente_id_cliente='${valorId}'`;
                conexion.query($query, function (err) {
                    if (err) {
                        console.log("error en el query");
                        console.log(err);
                        return;
                    } else {
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
                            icon: 'success',
                            title: 'Fecha de próxima declaración actualizada'

                        })
                        setTimeout(() => {
                            window.location.href = "./calendario.html";
                        }, 2000);
                    }
                });
            }
        }
    })


}
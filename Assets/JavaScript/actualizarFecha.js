const conexion = require('../conectar.js'); // llamada a js de conexion a BSD
const {default: Swal} = require('sweetalert2'); // Llamada a la libreria para los poppop´s

// funcion de actualizacion de fecha para usuario cliente
function actualizarFecha() {
    let nombreCliente = document.getElementById("Cliente").value;
    let fechaActualizada = document.getElementById("Nueva_fecha").value;
    console.log(fechaActualizada);
    $temp = `select id_cliente from cliente where nombreComCliente = '${nombreCliente}'`; //INSTRUCCION SQL, EXTRAE EL ID DEL CLIENTE

    conexion.query($temp, function (err, rows) {
        if (err) { //INSTRUCCION POR SI OCURRE UN ERROR
            console.log("error en el query");
            console.log(err);
            return;
        } else {
            var long = rows.length; //SE TOMA EL LANGO DE LA TABLA (OSEA LOS DATOS QUE CONTIENE)
            for (i = 0; i < long; i++) {
                var valorId = Number(rows[0].id_cliente); //EL VALOR DE LOS ID SE GUARDAN EN UNA LISTA DE NUMEROS
                console.log(valorId); // VERIFICAR QUE SE ESTA GUARDANDO BIEN LA INSTRUCCION DE ARRIBA
                //Instruccion SQL
                $query = `UPDATE calendario SET fechaDeclaracion='${fechaActualizada}' where cliente_id_cliente='${valorId}'`; //SE ACTUALIZA LA TABLA CALENDARIO CON LA NUEVA FECHA
                conexion.query($query, function (err) {
                    if (err) { //INSTRUCCION EN CASO DE ERROR
                        console.log("error en el query");
                        console.log(err);
                        return;
                    } else {
                        const Toast = Swal.mixin({ //INSTRUCCION DEL POPPOP
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
                        setTimeout(() => { //REDIRECCION EN UN LAPSO DE TIEMPO
                            window.location.href = "./Calendario.html";
                        }, 2000);
                    }
                });
            }
        }
    })
}
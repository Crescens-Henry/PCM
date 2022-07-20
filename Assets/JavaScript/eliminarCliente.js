const conexion = require('../conectar.js');
const btnBorrar= document.querySelector('#botonBorrar');
const {default: Swal} = require('sweetalert2');
btnBorrar.addEventListener('click',()=>{
    let nombreCliente = document.getElementById("nombreB").value;
    console.log(nombreCliente);
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
                $query = `DELETE FROM cliente where id_cliente='${valorId}'`;
                conexion.query($query, function (err) {
                    if (err) {
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
                            title: 'Cliente no eliminado'

                        })
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
                            title: 'Cliente eliminado correctamente'

                        })
                        setTimeout(() => {
                            window.location.href = "Carpetas.html";
                        }, 2000);
                    }
                });
            }
        }
    })
});
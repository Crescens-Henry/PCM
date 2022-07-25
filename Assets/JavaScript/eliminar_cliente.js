const conexion = require('../conectar.js'); //CONEXION A BASE DE DATOS
const btnBorrar = document.querySelector('#botonBorrar'); // CONSTANTE PARA BOTON
const {default: Swal} = require('sweetalert2'); //LIBRERIA DE POP
//BOTON PARA BORRAR UN CLIENTE
btnBorrar.addEventListener('click', () => {
    let nombreCliente = document.getElementById("nombreB").value;
    $temp = `select id_cliente from cliente where nombreComCliente = '${nombreCliente}'`; //SE SELECCIONA ID DEL CLIENTE YA QUE ES LA LLAVE PRIMARIA, SE GUARDA EN ALGO PARECIDO AL QUERY
    conexion.query($temp, function (err, rows) {
        if (err) { //EN CASO DE ERROR
            console.log("error en el query");
            console.log(err);
            return;
        } else if (rows.length ==0){//SI EL USUARIO NO SE ENCUENTRA
            const Toast = Swal.mixin({ //POP
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
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
        }else{
            //lo que se extrae de la BD, queda guardado en ROWS que se vuelve lista de objetos
            // se obtiene el tamano de la lista
            var long = rows.length;
            for (i = 0; i < long; i++) {
                var valorId = Number(rows[0].id_cliente); // SE EXTRAE EL VALOR DEL ID Y SE GUARDA EN UNA NUEVA VARIABLE
                //Instruccion SQL PARA ELIMINAR DE LA TABLA CLIENTE
                $query = `DELETE FROM cliente where id_cliente='${valorId}'`;
                conexion.query($query, function (err) {
                    if (err) { //EN CASO DE ERROR
                        //POP
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            width: 200,
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

                        //FIN POP
                        console.log("error en el query");
                        console.log(err);
                        return;
                    } else { //SE BORRO
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
                            icon: 'success',
                            title: 'Cliente eliminado correctamente'

                        })

                        //FIN POP
                        setTimeout(() => { //REDIRECCION AUTOMATICA
                            window.location.href = "Carpetas.html";
                        }, 2000);
                    }
                });
            }
        }
    })
});
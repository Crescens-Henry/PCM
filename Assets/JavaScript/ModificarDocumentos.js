const conexion = require('../conectar.js'); //CONEXION A BASE DE DATOS
const btnActualizar = document.querySelector('#Documentos');
const {
    default: Swal
} = require('sweetalert2'); //LIBRERIA POPPOP´S


btnActualizar.addEventListener('click', () => {

    // obtenemos el nombre condicional
    let nombre = document.getElementById('txtUsuario').value;
    let documentos = document.getElementById('Documentos').value;

    console.log(nombre);
    // obtenemos desde la base de datos la informacion poreestablecida
    $idCliente = `SELECT id_cliente FROM cliente WHERE nombreComCliente='${nombre}'`;
    conexion.query($idCliente, function (err, rows) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        } else {
            var long = rows.length;
            for (let i = 0; i < long; i++) {
                var valorIdCliente = Number(rows[i].id_cliente);

                $documentos = `select descDocumentos from carpeta where id_carpeta='${valorIdCliente}'`;
                conexion.query($documentos, function (err, rows) {
                    if (err) {
                        console.log("error en el query");
                        console.log(err);
                        return;
                    } else {
                        var descDocumentos = rows[0].descDocumentos;
                        document.getElementById("Documentos").value = descDocumentos;
                        console.log(descDocumentos);
                        // se actualiza la descripcion y mandamos a la BSD la nueva informacion
                        $actualizarDocs = `update carpeta set descDocumentos= '${documentos} where id_carpeta=${valorIdCliente}`;
                        conexion.query($actualizarDocs, function (err) {
                            if (err) {
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
                                    title: 'Declaracaion de documentos presentado han sido actualizados'

                                })
                                setTimeout(() => { //REDIRECCION EN UN LAPSO DE TIEMPO
                                    window.location.href = "./Carpetas.html";
                                }, 2000);
                            }
                        })
                    }
                })
            }
            console.log(valorIdCliente);
        }
    })

});
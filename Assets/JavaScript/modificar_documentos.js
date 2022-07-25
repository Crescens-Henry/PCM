const conexion = require('../conectar.js'); //CONEXION A BASE DE DATOS
const btnActualizar = document.querySelector('#btnDescInformacion');
const {default: Swal} = require('sweetalert2'); //LIBRERIA POPPOP´S


btnActualizar.addEventListener('click', () => {
    // obtenemos el nombre condicional
    let nombre = document.getElementById('txtUsuario').value;
    let documentos = document.getElementById('Documentos').value;
    // obtenemos desde la base de datos la informacion poreestablecida
    $idCliente = `SELECT id_cliente FROM cliente WHERE nombreComCliente='${nombre}'`;
    conexion.query($idCliente, function (err, rows) {
        if (err) {//EN CASO DE ERROR
            console.log("error en el query");
            console.log(err);
            return;
        } else if (rows.length ==0){//SI LOS LOS DATOS EXTRAIDOS ES 0
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
        }else{//EXITO
            //lo que se extrae de la BD, queda guardado en ROWS que se vuelve lista de objetos
            // SE OBTIENE EL TAMAÑO DE LA LISTA Y SE GUARDA EN UNA VARIABLE
            var long = rows.length;
            for (let i = 0; i < long; i++) {
                var valorIdCliente = Number(rows[i].id_cliente);// SE EXTRAE EL VALOR DEL ID Y SE GUARDA EN UNA NUEVA VARIABLE
                $documentos = `select descDocumentos from carpeta where cliente_id_cliente='${valorIdCliente}'`;//INSTRUCCION SQL PARA BUSCAR EN CARPETA
                conexion.query($documentos, function (err, rows) {
                    if (err) {//ERROR
                        console.log("error en el query");
                        console.log(err);
                        return;
                    } else {//EXITO
                        // SE EXTRAE EL VALOR DEL ID Y SE GUARDA EN UNA NUEVA VARIABLE
                        documentos = rows[0].descDocumentos;
                        document.getElementById("Documentos").value = documentos;//SE EXTRAE EL VALOR DE DOCUMENTOS
                        AyudanteActualizarInfo(documentos, valorIdCliente);//SE MANDA A LA FUNCION
                    }
                })
            }
        }
    })

});

function AyudanteActualizarInfo(documentos, valorIdCliente) {//FUNCION AYUDANTE
    this.tempDocumentos = documentos;

    this.valorIdCliente = valorIdCliente;

}

function ActualizarInformacion() {
    let documentos = document.getElementById('Documentos').value;
    // se actualiza la descripcion y mandamos a la BSD la nueva informacion
    $actualizarDocs = `update carpeta set descDocumentos= '${documentos}' where cliente_id_cliente='${valorIdCliente}'`;
    conexion.query($actualizarDocs, function (err) {
        if (err) {//ERROR
            console.log("error en el query");
            console.log(err);
            return;
        } else {//EXITO
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
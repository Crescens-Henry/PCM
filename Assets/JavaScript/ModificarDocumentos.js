const conexion = require('../conectar.js'); //CONEXION A BASE DE DATOS
const btnActualizar = document.querySelector('#Documentos');
const {
    default: Swal
} = require('sweetalert2'); //LIBRERIA POPPOP´S


btnActualizar.addEventListener('click', () => {

    // obtenemos el nombre condicional
    let nombre = document.getElementById('txtUsuario').value;
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

            $actualizarDocs = `update carpeta set descDocumentos= '${variableDatosAnteriores + ', '+variableDatosNuevos} where id_carpeta=${valorIdCliente}`;
                    }
                })
            }
            console.log(valorIdCliente);
        }
    })

});
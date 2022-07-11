const {default: Swal} = require('sweetalert2');
const conexion = require('../conectar.js');

const RegistrarContador = () => {//* listo
    var nombre = document.getElementById("nombre").value;
    var rango = document.getElementById("rango").value;
    var password = document.getElementById("password").value;
    //Instruccion SQL
    $query = `INSERT INTO contador (id_contador,nombreComContador,rango,contraseña) 
    VALUES ('','${nombre}','${rango}','${password}')`;
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
                title: 'Datos guardados'

            })
            setTimeout(() => {
                window.location.href = "../entrada.html";
            }, 2000);
        }
    });
}
const RegistrarCliente = () => {// ? en progreso
    var nombre = document.getElementById("nombreCliente").value;
    var rfc = document.getElementById("claveRFC").value;
    var tipo = document.getElementById("tipo").value;
    //Instruccion SQL
    
    //! debemo extraer por defecto el id de contador para que se asigne automaticamente a usuario cliente
    $query = `INSERT INTO cliente (id_cliente,nombreComCliente,rfc,tipo,contador_id_contador) VALUES ('','${nombre}','${rfc}','${tipo}','10005')`;
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
                title: 'Datos guardados'

            })
            setTimeout(() => {
                window.location.href = "Carpetas.html";
            }, 2000);
        }
    });
}
const RegistrarPalabras = () => {//* listo
    var palabra = document.getElementById("palabra").value;
    var concepto = document.getElementById("concepto").value;
    //  Instruccion SQL
    $query = `INSERT INTO diccionario (palabra,concepto) VALUES ('${palabra}','${concepto}')`;
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
                title: 'Datos guardados'

            })
            setTimeout(() => {
                window.location.href = "/HTML/Diccionario.html";
            }, 2000);
        }
    });
}

function Buscar() {// todo:sobre poner tabla
    var rfc = document.getElementById("rfcSearch").value;

    $query = `SELECT cliente.nombreComCliente, cliente.rfc, cliente.tipo, carpeta.descDocumentos, contador.nombreComContador, carpeta.cuentaBancaria FROM carpeta INNER JOIN cliente ON carpeta.cliente_id_cliente = cliente.id_cliente INNER JOIN contador ON cliente.contador_id_contador = contador.id_contador where cliente.rfc ='${rfc}';`
    //SELECT cliente.nombreCom, cliente.rfc, cliente.tipo, contador.nombreCom, carpeta.cuentaBancaria, carpeta.descDocumentos FROM carpeta INNER JOIN cliente ON carpeta.cliente_id_cliente = cliente.id_cliente INNER JOIN contador ON cliente.contador_id_contador = contador.id_contador;
    let tablaR = document.getElementById("table");
    conexion.query($query, function (err, rows) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        } else {
            //Lo que se extrae de la BD, queda guardado en ROWS que se vuelve una lista de objetos
            var long = rows.length; //Se obtiene el tamaño de la lista
            for (i = 0; i < long; i++) { //Se utiliza para recorrer la lista
                //cadena += rows[i].id + ' ' + rows[i].nombre +  ' ' + rows[i].contraseña +'\n';//Registro
                var newRow = tablaR.insertRow(-1);
                var celdaNombreCliente = newRow.insertCell(0);
                var celdaRFC = newRow.insertCell(1);
                var celdaDocumentos = newRow.insertCell(2);
                var celdaTipo = newRow.insertCell(3);
                var celdaNombreContador = newRow.insertCell(4);
                var celdaCuenta = newRow.insertCell(5);

                var textoNombreCliente = document.createTextNode(rows[i].nombreComCliente);
                var textoRFC = document.createTextNode(rows[i].rfc);
                var textoDocumentos = document.createTextNode(rows[i].descDocumentos);
                var textoTipo = document.createTextNode(rows[i].tipo);
                var textoNombreContador = document.createTextNode(rows[i].nombreComContador);
                var textoCuenta = document.createTextNode(rows[i].cuentaBancaria);
                celdaNombreCliente.appendChild(textoNombreCliente);
                celdaRFC.appendChild(textoRFC);
                celdaDocumentos.appendChild(textoDocumentos);
                celdaTipo.appendChild(textoTipo);
                celdaNombreContador.appendChild(textoNombreContador);
                celdaCuenta.appendChild(textoCuenta);
            }
            //alert(cadena);
        }
    });
}
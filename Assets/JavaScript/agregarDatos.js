const {default: Swal} = require('sweetalert2');// llamada a la libreria de pop pups
//const btnRe
const conexion = require('../conectar.js');// llamada a la conexion de BSD

//* funcion para registrar usuario contador utilizada en entrada como opcinal
const RegistrarContador = () => { //* listo
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
//* funcion para registrar usuario cliente utilizada en AgregarCliente.html
const registrarCliente = () => { // ? en progreso
    var nombre = document.getElementById("nombreCliente").value;
    var rfc = document.getElementById("claveRFC").value;
    var cuentaBancaria = document.getElementById("cuentaBancaria").value;
    var tipo = document.getElementById("tipo").value; //? se debe seleccionar por defecto
    var localizacion = document.getElementById("localizacion").value;
    var documentos = document.getElementById("documentos").value; // * esto va en la tabla de carpetas
    //Instruccion SQL

    //! debemo extraer por defecto el id de contador para que se asigne automaticamente a usuario cliente
    $temp = `INSERT INTO cliente(id_cliente,nombreComCliente,rfc,tipo,contador_id_contador) VALUES ('','${nombre}','${rfc}','${tipo}','10005')`; //? investigar como traer el dato de contador como por defecto desde que se inicia sesion
    
    // todo: sentencia query mediante nombre completo obtener el id 
    conexion.query($temp, function (err, rows) {           
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        } else {
            $id= `SELECT id_cliente FROM cliente WHERE nombreComCliente='${nombre}'`;
            conexion.query($id, function (err, rows) {           
                if (err) {
                    console.log("error en el query");
                    console.log(err);
                    return;
                } else {
                    var long = rows.length;
                    for (i = 0; i < long; i++) {
                        var valorId = Number(rows[0].id_cliente);
                        console.log(valorId);
                        $query=`INSERT INTO carpeta(id_carpeta,descDocumentos, localizacion, cuentaBancaria, cliente_id_cliente) VALUES ('','${documentos}','${localizacion}','${cuentaBancaria}', '${valorId}')`;
                        console.log("Entra");
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
                        })
                    }
                }
            });}})
    //! creamos el apartado de carpeta con los datos que utiliza el join (tabla cliente, contador y carpeta) insertar por separado pero estando vinculados cada uno 
}
//* funcion para registrar palabras utilizada en agregarPalabra.html
const RegistrarPalabras = () => { //* listo
    var palabra = document.getElementById("palabra").value;
    var concepto = document.getElementById("concepto").value;
    //  Instruccion SQL
    $query = `INSERT INTO diccionario (palabra,concepto) VALUES ('${palabra}','${concepto}')`;
    conexion.query($query, function (err) {//! ejecutamos el query e informamos posibilidad de error
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        } else {
            // * inicio de pop
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
                window.location.href = "Diccionario.html";
            }, 2000);
            //* fin de pop
        }
    });
}
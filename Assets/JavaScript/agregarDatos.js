const {
    default: Swal
} = require('sweetalert2'); // llamada a la libreria de pop pups
const conexion = require('../conectar.js'); // llamada a la conexion de BSD

//* funcion para registrar usuario contador utilizada en entrada como opcinal
const RegistrarContador = () => { //* listo
    //EXTRACCION DEL VALOR INGRESADO EL EN HTML
    var nombre = document.getElementById("nombre").value;
    var rango = document.getElementById("rango").value;
    var password = document.getElementById("password").value;
    //Instruccion SQL
    $query = `INSERT INTO contador (id_contador,nombreComContador,rango,contraseña) 
    VALUES ('','${nombre}','${rango}','${password}')`; //INGRESO DE DATOS A LA TABLA
    conexion.query($query, function (err) {
        if (err) { //IINSTRUCCION EN CASO DE ERROR
            console.log("error en el query");
            console.log(err);
            return;
        } else {
            const Toast = Swal.mixin({ //CREACION DEL POPPOP
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
            setTimeout(() => { //REDIRECION DESPUES DE CIERTO TIEMPO
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
    var fechaDeclaracion = document.getElementById("fechaDeclaracion").value;
    var nombreComContador = JSON.parse(localStorage.getItem("nombre"));
    console.log(nombreComContador);

    //!prueba de valores obtenidos para la limitacion de caracteres

    console.log(rfc.length);
    console.log(cuentaBancaria.length);

    if (rfc.length < 12 || rfc.length > 13) {
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
            icon: 'info',
            title: 'RFC invalido, intente de nuevo'

        })
    } else if (cuentaBancaria.length != 18 && cuentaBancaria.length !=20) {

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
            icon: 'info',
            title: 'Cuenta bancaria invalida, intente de nuevo'

        })
    } else {
        $query2 = `SELECT id_contador FROM contador where nombreComContador= '${nombreComContador}'`;
        //Instruccion SQL
        conexion.query($query2, function (err, rows) {
            if (err) {
                console.log("error en el query");
                console.log(err);
                return;
            } else {
                var long = rows.length;
                for (let i = 0; i <= long; i++) {

                    var valorIdC = Number(rows[i].id_contador);
                    console.log("valorIdc = " + valorIdC);
                    $temp = `INSERT INTO cliente(id_cliente,nombreComCliente,rfc,tipo,contador_id_contador) VALUES ('','${nombre}','${rfc}','${tipo}','${valorIdC}')`;

                    conexion.query($temp, function (err, rows) {
                        if (err) {
                            console.log("error en el query");
                            console.log(err);
                            return;
                        } else {
                            $id = `SELECT id_cliente FROM cliente WHERE nombreComCliente='${nombre}'`;
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
                                        $query = `INSERT INTO carpeta(id_carpeta,descDocumentos, localizacion, cuentaBancaria, cliente_id_cliente) VALUES ('','${documentos}','${localizacion}','${cuentaBancaria}', '${valorId}')`;
                                        console.log("Entra");
                                        conexion.query($query, function (err) {
                                            if (err) {
                                                console.log("error en el query");
                                                console.log(err);
                                                return;
                                            } else {
                                                $query3 = `INSERT INTO calendario(id_calendario,fechaDeclaracion,cliente_id_cliente) VALUES ('','${fechaDeclaracion}','${valorId}')`;
                                                console.log("Entra");
                                                conexion.query($query3, function (err) {
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
                                                        }, 1500);
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    })
                }
            }
        })
    }
}

//* funcion para registrar palabras utilizada en agregarPalabra.html
const RegistrarPalabras = () => { //* listo
    var palabra = document.getElementById("palabra").value;
    var concepto = document.getElementById("concepto").value;
    //  Instruccion SQL
    $query = `INSERT INTO diccionario (palabra,concepto) VALUES ('${palabra}','${concepto}')`;
    conexion.query($query, function (err) { //! ejecutamos el query e informamos posibilidad de error
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
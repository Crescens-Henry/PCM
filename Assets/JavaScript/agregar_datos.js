const {default: Swal} = require('sweetalert2'); // llamada a la libreria de pop pups
const conexion = require('../conectar.js'); // llamada a la conexion de BSD

//* funcion para registrar usuario contador utilizada en entrada como opcinal
const RegistrarContador = () => { //* listo
    //EXTRACCION DE VALORES INGRESADO EL EN HTML
    var nombre = document.getElementById("nombre").value;
    var rango = document.getElementById("rango").value;
    var password = document.getElementById("password").value;
    //Instruccion SQL
    $query = `INSERT INTO contador (id_contador,nombreComContador,rango,contraseña) VALUES ('','${nombre}','${rango}','${password}')`; //INGRESO DE DATOS A LA TABLA
    conexion.query($query, function (err) {
        if (err) { //INSTRUCCION EN CASO DE ERROR
            console.log("error en el query");
            console.log(err);
            return;
        } else {//EN CASO DE EXITO
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
const registrarCliente = () => { 
    //EXTRACCION DE VALORES INGRESADOS
    var nombre = document.getElementById("nombreCliente").value;
    var rfc = document.getElementById("claveRFC").value;
    var cuentaBancaria = document.getElementById("cuentaBancaria").value;
    var tipo = document.getElementById("tipo").value;
    var localizacion = document.getElementById("localizacion").value;
    var documentos = document.getElementById("documentos").value; // * esto va en la tabla de carpetas
    var fechaDeclaracion = document.getElementById("fechaDeclaracion").value;//* ESTO VA EN LA TABLA DE CALENDARIO
    var nombreComContador = JSON.parse(localStorage.getItem("nombre")); //NOMBRE DEL CONTADOR QUE INGRESO

    if (rfc.length < 12 || rfc.length > 13) {//EL LARGO EL RFC TIENE QUE ESTAR ENTRE ESTOS VALORES
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
    } else if (cuentaBancaria.length != 16 && cuentaBancaria.length !=20) {// SI LA CUENTA BANCARIA INGRESADA NO TIENE 16 O 20 DIGITOS

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
    } else {//CSI ESTA TODO BIEN
        $query2 = `SELECT id_contador FROM contador where nombreComContador= '${nombreComContador}'`;//SE SELECCIONA EL ID DEL CONTADOR
        //Instruccion SQL
        conexion.query($query2, function (err, rows) {
            if (err) {//EN CASO DE ERROR
                console.log("error en el query");
                console.log(err);
                return;
            } else {//EN CASO DE EXITO
                //lo que se extrae de la BD, queda guardado en ROWS que se vuelve lista de objetos
            // SE OBTIENE EL TAMAÑO DE LA LISTA Y SE GUARDA EN UNA VARIABLE
                var long = rows.length;
                for (let i = 0; i < long; i++) {
                    var valorIdC = Number(rows[i].id_contador);// SE EXTRAE EL VALOR DEL ID Y SE GUARDA EN UNA NUEVA VARIABLE
                    $temp = `INSERT INTO cliente(id_cliente,nombreComCliente,rfc,tipo,contador_id_contador) VALUES ('','${nombre}','${rfc}','${tipo}','${valorIdC}')`;//INSTRUCCION SQL PARA INSERTAR EN LA TABLA CLIENTE
                    conexion.query($temp, function (err) {
                        if (err) {//EN CASO DE ERROR
                            console.log("error en el query");
                            console.log(err);
                            return;
                        } else {//EN CASO DE EXITO
                            $id = `SELECT id_cliente FROM cliente WHERE nombreComCliente='${nombre}'`;//SE SELECCIONA EL ID DEL CLIENTE
                            conexion.query($id, function (err, rows) {
                                if (err) {//EN CASO DE ERRO
                                    console.log("error en el query");
                                    console.log(err);
                                    return;
                                } else {//CASO EXITOSO
                                    //lo que se extrae de la BD, queda guardado en ROWS que se vuelve lista de objetos
            // SE OBTIENE EL TAMAÑO DE LA LISTA Y SE GUARDA EN UNA VARIABLE
                                    var long = rows.length;
                                    for (i = 0; i < long; i++) {
                                        var valorId = Number(rows[0].id_cliente);//SE EXTRAE EL VALOR DEL ID Y SE GUARDA EN UNA NUEVA VARIABLE
                                        $query = `INSERT INTO carpeta(id_carpeta,descDocumentos, localizacion, cuentaBancaria, cliente_id_cliente) VALUES ('','${documentos}','${localizacion}','${cuentaBancaria}', '${valorId}')`;
                                        //INSTRUCCION SQL PARA INSERTAR EN LA TABLA CARPETA
                                        conexion.query($query, function (err) {
                                            if (err) {//EN CASO DE ERROR
                                                console.log("error en el query");
                                                console.log(err);
                                                return;
                                            } else {//EN CASO DE EXITO
                                                $query3 = `INSERT INTO calendario(id_calendario,fechaDeclaracion,cliente_id_cliente) VALUES ('','${fechaDeclaracion}','${valorId}')`;
                                                //INSTRUCCION SQL PARA INSERTAR EN LA TABLA CALENDARIO
                                                conexion.query($query3, function (err) {
                                                    if (err) {//EN CASO DE ERROR
                                                        console.log("error en el query");
                                                        console.log(err);
                                                        return;
                                                    } else {//CASO EXITOSO
                                                        const Toast = Swal.mixin({//POP
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
const RegistrarPalabras = () => { 
    //SE EXTRAEN LOS VALORES INGRESADOS EN HTML
    var palabra = document.getElementById("palabra").value;
    var concepto = document.getElementById("concepto").value;
    //  Instruccion SQL PARA INSERTAR EN LA TABLA DICCIONARIO
    $query = `INSERT INTO diccionario (palabra,concepto) VALUES ('${palabra}','${concepto}')`;
    conexion.query($query, function (err) {
        if (err) { // ejecutamos el query e informamos posibilidad de error
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
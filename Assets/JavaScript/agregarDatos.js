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
function RegistrarCliente() { // ? en progreso --------
    var nombre = document.getElementById("nombreCliente").value;
    var rfc = document.getElementById("claveRFC").value;
    var cuentaBancaria = document.getElementById("cuentaBancaria").value;
    var tipo = document.getElementById("tipo").value; //? se debe seleccionar por defecto
    var localizacion = document.getElementById("localizacion").value;
    var documentos = document.getElementById("documentos").value; // * esto va en la tabla de carpetas
    var nombreComContador = JSON.parse(localStorage.getItem("nombre"));
    console.log(nombreComContador);
    $query2 = `SELECT id_contador FROM contador where nombreComContador= ' ${nombreComContador}'`;
    // todo: sentencia query mediante nombre completo obtener el id 
    //? investigar como traer el dato de contador como por defecto desde que se inicia sesion

    conexion.query($query2, function (err, rows) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        } else {
            var long = rows.length;
            for (let i = 0; i < long; i++) {
                var valorId = Number(rows[i].id_contador);

                console.log("dentro del for");
                $query1 = `INSERT INTO cliente (id_cliente,nombreComCliente,rfc,tipo,contador_id_contador) VALUES ('','${nombre}','${rfc}','${tipo}','${valorId}')`;
                conexion.query($query1, function (err) {
                        if (err) { //INSTRUCCION EN CASO DE ERROR
                            console.log("error en el query");
                            console.log(err);
                            return;
                        } else {
                            const Toast = Swal.mixin({ //POPPOP
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 2000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            });

                            Toast.fire({
                                icon: 'success',
                                title: 'Datos guardados'

                            })
                            setTimeout(() => { //REDIRECCION 
                                window.location.href = "Carpetas.html";
                            }, 2000);
                        }
                    }



                    //Instruccion SQL
                    //! opcion 2... editar directamente la view para porder insertar datos
                    //! debemo extraer por defecto el id de contador para que se asigne automaticamente a usuario cliente

                    //! creamos el apartado de carpeta con los datos que utiliza el join (tabla cliente, contador y carpeta) insertar por separado pero estando vinculados cada uno 
                );
            }
        }
    });
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
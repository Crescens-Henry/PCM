const {default: Swal} = require('sweetalert2'); //LIBRERIA DE POP
const {query} = require('./conectar'); //CONEXION A BASE DE DATOS
var conexion = require('./conectar'); //CONEXION A BASE DE DATOS
const contador = document.querySelector('#txtContador');
const pass = document.querySelector('#password');
const button = document.querySelector('#button'); //CONSTANTE DE BOTON

//BOTON PARA INGRESAR
button.addEventListener('click', () => {
    var nombre = contador.value;
    let password = pass.value;
    let err = true;
    if (nombre == '') { //SI EL NOMBRE ESTA VACIO
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
            title: 'Ingrese usuario, por favor'

        })
    } else if (password == '') { //SI LA CONTRASEÑA ESTA VACIA
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
            title: 'Ingrese contraseña, por favor'

        })
    } else { //SI NINGUNO DE LOS DATOS ESTA VACIO
        $query = `select * from contador where nombreComContador ='${nombre}'`; //busca los datos del contador
        conexion.query($query, function (err, rows) {
            if (err) { //EN CASO DE ERROR
                console.log("error en el query");
                console.log(err);
                return;
            } else if (rows.length != 0) { //SI EL LARGO DE ROWS ES DIFERENTE A 0, OSEA ENCONTRO AL USUARIO //
                if (rows[0].contraseña == password) { // USUARIO Y CONTRASEÑA IGUAL QUE EN LA BASE DE DATOS
                    localStorage.setItem("nombre", JSON.stringify(nombre));
                    err = false;
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
                        icon: 'success',
                        title: 'Inicio de sesion exitoso'

                    })
                    setTimeout(() => { //REDIRECCION
                        window.location.href = "HTML/MenuPrincipal.html";
                    }, 1500);

                } else { //SI LA CONTRASEÑA ES DIFERENTE
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
                        title: 'Contraseña incorrecta, intente de nuevo'
                    })
                }
            } else { //SI NO ENCUENTRA EL USUARIO
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
            }
        });
    }
});
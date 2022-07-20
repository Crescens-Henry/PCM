const {
    default: Swal
} = require('sweetalert2');
const {
    query
} = require('./conectar');
var conexion = require('./conectar');
const contador = document.querySelector('#txtContador');
const pass = document.querySelector('#password');
const button = document.querySelector('#button');



button.addEventListener('click', () => {
    var nombre = contador.value;
    let password = pass.value;
    let err = true;
    if (nombre == '') {
        const Toast = Swal.mixin({
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
    } else if (password == '') {
        const Toast = Swal.mixin({
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
    } else {
        $query = `select * from contador where nombreComContador ='${nombre}'`; //busca
        conexion.query($query, function (err, rows) {
            if (err) {
                console.log("error en el query");
                console.log(err);
                return;
            } else if (rows.length != 0) { //'&& contraseña ='${pass}
                //console.log(password)
                //console.log(rows[0].contraseña)

                if (rows[0].contraseña == password) {
                    err = false;
                    const Toast = Swal.mixin({
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
                    setTimeout(() => {
                        window.location.href = "HTML/MenuPrincipal.html";
                    }, 1500);

                } else {
                    const Toast = Swal.mixin({
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
            } else {
                const Toast = Swal.mixin({
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
            /* for (let i = 0; i < users.length; i++) {
                 if (usuario === users[i].user && password === users[i].pass) {
                     
                     localStorage.setItem("usuario", users[i].nombre);
                     alert('¡Bienvenido ' + users[i].nombre + '!');
                     error = false;

                    
                     break;
                 }
             }
             if (error) {
                 alert('¡Datos incorrectos!');
             }*/
        });
    }
});

/*const validarPassword=(password, usuarios)=>{
    for(i=0; i<usuarios.length;i++){
        if(password==usuarios[i].password){
            return password;
        }
    }
    return -1;
}

const RegistrarContador = () => {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var rango = document.getElementById("rango").value;
    var password = document.getElementById("password").value;
    //Instruccion SQL
    $query = `INSERT INTO contador (id_contador,nombre,apellido,rango,contraseña) VALUES ('','${nombre}','${apellido}','${rango}','${password}')`;
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
                timer: 1500,
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
                window.location.href = "./entrada.html";
            }, 1500);
        }
    });
}*/
/*const Registro=()=>{
        listaUsuarios=JSON.parse(localStorage.getItem("lista"));
        let correo= document.getElementById("txtCorreo").value;// mando a llamar los datos 
        let texto= document.getElementById("txtUsuario").value;// mando a llamar los datos 
        let password= document.getElementById("txtPassword").value;// mando a llamar los datos
        let con
        let aviso;// declaro una variable
        let users = {correo, texto, password}
        Usuarios.unshift(users)
        console.log(Usuarios);
        location.href="InicioSesion.html";
}*/
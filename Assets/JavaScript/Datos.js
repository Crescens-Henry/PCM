const user = document.querySelector('#txtContador');
const pass = document.querySelector('#password');
const button = document.querySelector('#button');

let users;

let usersPreCargados = [{ user: 'majocosta', pass: '1234', nombre: 'María José Domínguez Costa' }, 
{ user: 'Crescencio', pass: '5678', nombre: 'Crescencio Perez Santiz' }, 
{ user: 'PaolaPenagos', pass: '9876', nombre: 'Paola Anaray Canseco Penagos' }];

if (localStorage.getItem('registro')) {
    users = usersPreCargados;
    let registro = JSON.parse(localStorage.getItem('registro'));
    let newArray = users.concat(registro);
    users = newArray;
} else {
    users = usersPreCargados;
}


button.addEventListener('click', () => {
    let usuario = user.value;
    let password = pass.value;
    let error = true;

    if (usuario == '') {
        alert('Ingrese usuario, por favor.');
    }
    if (password == '') {
        alert('Ingrese contraseña, por favor.');
    } else {
        for (let i = 0; i < users.length; i++) {
            if (usuario === users[i].user && password === users[i].pass) {
                localStorage.setItem("usuario", users[i].nombre);
                alert('¡Bienvenido ' + users[i].nombre + '!');
                error = false;

                window.location.href = "./Menu Principal.html";
                break;
            }
        }
        if (error) {
            alert('¡Datos incorrectos!');
        }
    }
});

const validarPassword=(password, usuarios)=>{
    for(i=0; i<usuarios.length;i++){
        if(password==usuarios[i].password){
            return password;
        }
    }
    return -1;
}


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
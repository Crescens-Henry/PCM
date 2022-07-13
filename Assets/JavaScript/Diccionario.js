const conexion = require('../conectar.js');
const btnBuscarPalabra=document.querySelector('#BuscarPalabra');
const {default: Swal} = require('sweetalert2');


const ConsultarDiccionario = () => {
    //var cadena;
    $query = 'select * FROM diccionario;'; // instruccion SQL
    let tablaDiccionario = document.getElementById("tableDiccionario");
    conexion.query($query, function (err, rows) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        } else {
            //lo que se extrae de la BD, queda guardado en ROWS que se vuelve lista de objetos
            var long = rows.length; // se obtiene el tamano de la lista
            for (i = 0; i < long; i++) {
                var newRowDiccionarnio = tablaDiccionario.insertRow(-1);
                var celdaPalabra = newRowDiccionarnio.insertCell(0);
                var celdaConcepto = newRowDiccionarnio.insertCell(1);
                var textoPalabra = document.createTextNode(rows[i].palabra);
                var textConcepto = document.createTextNode(rows[i].concepto);

                celdaPalabra.appendChild(textoPalabra);
                celdaConcepto.appendChild(textConcepto);
            }
            //alert(cadena)
        }
    })
}
ConsultarDiccionario();


btnBuscarPalabra.addEventListener('click',()=>{
    let palabra = document.getElementById('palabraBuscar').value;
    let query = `SELECT * FROM diccionario WHERE palabra ='${palabra}';`;
 // instruccion SQL
    let tablaDiccionario = document.getElementById("tableDiccionario");
    tablaDiccionario.innerHTML='';
    conexion.query(query, function (err, rows) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        } else if (rows.length == 0) {
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
            icon: 'error',
            title: 'palabra no encontrada'

        })  
        } else{//! resultado en pantalla
            //*lo que se extrae de la BD, queda guardado en ROWS que se vuelve lista de objetos
            var newRow = tablaDiccionario.insertRow(-1);
                var celdaPalabra = newRow.insertCell(0);
                var celdaConcepto = newRow.insertCell(1);
                
                
                var textoPalabra = document.createTextNode(rows[0].palabra);
                var textConcepto = document.createTextNode(rows[0].concepto);
         
                celdaPalabra.appendChild(textoPalabra);
                celdaConcepto.appendChild(textConcepto);
        }
    })
});
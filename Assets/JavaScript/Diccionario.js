const conexion = require('../conectar.js');

const ConsultarDiccionario = () =>{
//var cadena;
$query = 'select * FROM diccionario;';// instruccion SQL
let tablaDiccionario = document.getElementById("tableDiccionario");
conexion.query($query, function (err, rows) {
    if (err) {
        console.log("error en el query");
        console.log(err);
        return;
    }
    else{
        //lo que se extrae de la BD, queda guardado en ROWS que se vuelve lista de objetos
        var long = rows.length;// se obtiene el tamano de la lista
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
document.addEventListener('DOMContentLoaded', ConsultarDiccionario,false)// inicializa la tabla

const conexion = require('../conectar.js'); //CONEXION A BASE DE DATOS
const btnBuscarPalabra = document.querySelector('#BuscarPalabra'); //CONSTANTE PARA BOTON
const {default: Swal} = require('sweetalert2'); //LIBRERIA DE POPPOP´S


class Nodo { // Nodo
    constructor(llave, obj) {
        this.llave = llave
        this.obj = obj

        this.der = null
        this.izq = null
    }
}

class Arbol {
    constructor() {
        this.raiz = null
    }

    isEmpty() { //ESTA VACIO
        return this.raiz === null
    }

    Agregar(llave, obj) {
        // arbol no tiene elementos
        if (this.isEmpty()) {
            this.raiz = new Nodo(llave, obj);
            return;
        }

        var aux = this.raiz;

        while (aux) {
            // vamos hacia la izquierda
            if (llave < aux.llave) {
                if (aux.izq) {
                    aux = aux.izq;
                } else {
                    aux.izq = new Nodo(llave, obj);
                    return;
                }
            } else { // vamos hacia la derecha
                if (aux.der) {
                    aux = aux.der;
                } else {
                    aux.der = new Nodo(llave, obj);
                    return;
                }
            }
        }
    }



    Buscar(llave) { //! funcion de busqueda
        if (this.isEmpty()) { // SI ESTA VACIO
            return null
        }

        var aux = this.raiz
        if (aux.llave === llave) {
            return aux
        }

        while (aux) {
            // si encontramos el nodo con el valor
            // paramos de iterar.
            if (aux.llave === llave) {
                break
            }
            // seguimos buscando a la derecha
            if (aux.llave < llave) {
                aux = aux.der
            } else if (aux.llave > llave) {
                // seguimos buscando a la izquierda
                aux = aux.izq
            }
        }
        // retornamos el nodo encontrado.
        // si no encontramos el nodo con el valor
        // aux, toma el valor null.
        return aux
    }

    Encontrando(Nodo = this.raiz) { //* funcion que ayuda a delete()
        if (!this.isEmpty()) {
            /**
             * siempre a la izquierda de cualquier nodo
             * estará el menor valor.
             * iteramos hasta el último menor.
             */
            while (Nodo.izq) {
                Nodo = Nodo.izq
            }
            return Nodo
        }
    }

    Borrar(llave, Nodo = this.raiz) { //! funcion de eliminar
        if (!Nodo) {
            return null
        }
        if (Nodo.llave === llave) {
            // no tiene hijos
            if (!Nodo.izq && !Nodo.der) {
                return null
            }
            // no tiene hijo izquierdo
            if (!Nodo.izq) {
                return Nodo.der
            }
            // no tiene hijo derecho
            if (!Nodo.der) {
                return Nodo.izq
            }

            // tiene dos hijos
            // buscamos el menor de los hijos
            var temp = this.Encontrando(Nodo.der)
            // con ese valor reemplazamos el valor del nodo que queremos eliminar.
            Nodo.llave = temp.llave;
            // seguimos iterando para reemplazar la rama que cambio,
            // eliminando el nodo que está repetido
            Nodo.der = this.Borrar(temp.llave, Nodo.der)
            return Nodo;
        }
        // buscamos a la derecha
        if (Nodo.llave < llave) {
            Nodo.der = this.Borrar(llave, Nodo.der)
            return Nodo
        }
        // buscamos a la izquierda
        if (Nodo.llave > llave) {
            Nodo.izq = this.Borrar(llave, Nodo.izq)
            return Nodo
        }
    }
    //! funciones para la imprension en consola
    print(Nodo = this.raiz) {
        if (!Nodo) {
            return
        }
        this.print(Nodo.izq)
        console.log('llave: ' + Nodo.llave + '\n\t', Nodo.obj)
        this.print(Nodo.der)
    }
    /**
     * recorre primero toda la rama izquierda
     * de izquierda al centro.
     * Luego imprime la raíz, y finalmente
     * recorre la rama derecha, del centro hacia
     * la derecha.
     */
    inOrder(Nodo = this.raiz) {
        if (!Nodo) {
            return;
        }
        this.inOrder(Nodo.izq);
        console.log('llave: ' + Nodo.llave + '\n\t', Nodo.obj);
        datos.push(Nodo);
        palabra.push(Nodo.llave);
        concepto.push(Nodo.obj);
        this.inOrder(Nodo.der);
    }
    /**
     * Imprime primero la raíz, luego
     * toda la rama izquierda de izquierda al centro.
     * y finalmente recorre la rama derecha,
     * del centro hacia la derecha.
     */
    preOrder(Nodo = this.raiz) {
        if (!Nodo) {
            return;
        }
        console.log('llave: ' + Nodo.llave + '\n\t', Nodo.obj);
        this.preOrder(Nodo.izq);
        this.preOrder(Nodo.der);
    }
    /**
     * Recorre el árbol de izquierda hacia el centro.
     * Luego del centro hacia la derecha, y finalmente
     * imprime la raíz.
     */
    postOrder(Nodo = this.raiz) {
        if (!Nodo) {
            return
        }
        this.postOrder(Nodo.izq)
        this.postOrder(Nodo.der)
        console.log('llave: ' + Nodo.llave + '\t', Nodo.obj)
    }
}
var arbolBinario = new Arbol() // madno a llamar el arbol

let datos = [];
let palabra = [];
let concepto = [];

//FUNCION PARA MOSTRAR EL DICCIONARIO*/
function ConsultarDiccionario() {
    //var cadena
    $query = 'select palabra, concepto FROM diccionario'; // instruccion SQL
    conexion.query($query, function (err, rows) {
        if (err) { //INSTRUCCION EN CASO DE ERROR
            console.log("error en el query");
            console.log(err);
            return;
        } else { //EXITO
            let tablaDiccionario = document.getElementById("tableDiccionario");
            //lo que se extrae de la BD, queda guardado en ROWS que se vuelve lista de objetos
            // se obtiene el tamano de la lista
            for (i = 0; i < rows.length; i++) { //SE REPITE HASTA EL LARGO DE LA LISTA
                arbolBinario.Agregar(rows[i].palabra, rows[i].concepto); //SE AGRGAN AL ARBOL
            }
            arbolBinario.inOrder(); //SE LLAMA EL INORDEN
            for (i = 0; i < datos.length; i++) { //CREACION DE LA TABLA A MOSTRAR
                var newRowDiccionarnio = tablaDiccionario.insertRow(-1);
                var celdaPalabra = newRowDiccionarnio.insertCell(0);
                var celdaConcepto = newRowDiccionarnio.insertCell(1);
                var textoPalabra = document.createTextNode(palabra[i]);
                var textConcepto = document.createTextNode(concepto[i]);
                celdaPalabra.appendChild(textoPalabra);
                celdaConcepto.appendChild(textConcepto);

            }
            //alert(cadena)
        }
    })
}
ConsultarDiccionario();

//FUNCION PARA BORRAR PALABRA
function borrarPalabra() {
    var palabraBorrar = document.getElementById("palabraB").value;
    let temp = `SELECT * FROM diccionario WHERE palabra ='${palabraBorrar}'`;
    // instruccion SQL
    conexion.query(temp, function (err, rows) {
        if (err) {
            console.log("error en el query");
            console.log(err);
            return;
        } else {
            for (i = 0; i < rows.length; i++) {
                arbolBinario.Borrar(palabra[i]);
            }
            let query = `DELETE FROM diccionario WHERE palabra ='${palabraBorrar}'`;
            // instruccion SQL
            conexion.query(query, function (err) {
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
                        title: 'palabra borrada con exito'

                    })
                    setTimeout(() => {
                        window.location.href = "Diccionario.html";
                    }, 2000);
                }
            })
        }
    })
}
//FUNCION BUSCAR
function buscarPalabra() {
    let tablaDiccionario = document.getElementById("tableDiccionario");
    let palabra = document.getElementById('palabraBuscar').value;
    let query = `SELECT * FROM diccionario WHERE palabra ='${palabra}';`;
    // instruccion SQL
    tablaDiccionario.innerHTML = '';
    conexion.query(query, function (err, rows) {
        if (err) { //INSTRUCCION EN CASO DE ERROR
            console.log("error en el query");
            console.log(err);
            return;
        } else if (rows.length == 0) { //
            const Toast = Swal.mixin({ //POP
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
        } else { //! resultado en pantalla
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
}
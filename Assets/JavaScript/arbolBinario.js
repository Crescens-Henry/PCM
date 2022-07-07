class UsuarioCliente {// objeto usuario a registrar por el contador
    constructor(id, nombre, clave) {
        this.id = id;
        this.nombre = nombre;
        this.clave = clave;
    }
}

class Nodo {// Nodo
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

    isEmpty() {
        return this.raiz === null
    }

    Agregar(llave, obj) {
        // arbol no tiene elementos
        if (this.isEmpty()) {
            this.raiz = new Nodo(llave, obj)
            return
        }

        var aux = this.raiz

        while (aux) {
            // vamos hacia la izquierda
            if (llave < aux.llave) {
                if (aux.izq) {
                    aux = aux.izq
                } else {
                    aux.izq = new Nodo(llave, obj)
                    return
                }
            } else { // vamos hacia la derecha
                if (aux.der) {
                    aux = aux.der
                } else {
                    aux.der = new Nodo(llave, obj)
                    return
                }
            }
        }
    }



    Buscar(llave) { //! funcion de busqueda
        if (this.isEmpty()) {
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
            return
        }
        this.inOrder(Nodo.izq)
        console.log('llave: ' + Nodo.llave + '\n\t', Nodo.obj)
        this.inOrder(Nodo.der)
    }
    /**
     * Imprime primero la raíz, luego
     * toda la rama izquierda de izquierda al centro.
     * y finalmente recorre la rama derecha,
     * del centro hacia la derecha.
     */
    preOrder(Nodo = this.raiz) {
        if (!Nodo) {
            return
        }
        console.log('llave: ' + Nodo.llave + '\n\t', Nodo.obj)
        this.preOrder(Nodo.izq)
        this.preOrder(Nodo.der)
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
//! se declaran los valores que contendra el arbol binario
var arbolBinario = new Arbol() // madno a llamar el arbol
// declaro mis objetos
var clienteUsuario1 = new UsuarioCliente(1, 'Crescencio', '1001')
var clienteUsuario2 = new UsuarioCliente(2, 'Kristell', '1002')
var clienteUsuario3 = new UsuarioCliente(3, 'Eczar', '1003')
var clienteUsuario4 = new UsuarioCliente(4, 'Jonathan', '1004')
var clienteUsuario5 = new UsuarioCliente(5, 'Mauricio', '1005')
var clienteUsuario6 = new UsuarioCliente(6, 'Diana', '1006')
var clienteUsuario7 = new UsuarioCliente(7, 'Maria', '1007')
var clienteUsuario8 = new UsuarioCliente(8, 'Angel', '1008')
var clienteUsuario9 = new UsuarioCliente(9, 'Oscar', '1009')
var clienteUsuario10 = new UsuarioCliente(10, 'Andres', '10010')
var clienteUsuario11 = new UsuarioCliente(11, 'Adolfo', '10011')
var clienteUsuario12 = new UsuarioCliente(12, 'Martin', '10012')

// agrego mis objetos al arbol binario
arbolBinario.Agregar(clienteUsuario1.nombre, clienteUsuario1)
arbolBinario.Agregar(clienteUsuario2.nombre, clienteUsuario2)
arbolBinario.Agregar(clienteUsuario3.nombre, clienteUsuario3)
arbolBinario.Agregar(clienteUsuario4.nombre, clienteUsuario4)
arbolBinario.Agregar(clienteUsuario5.nombre, clienteUsuario5)
arbolBinario.Agregar(clienteUsuario6.nombre, clienteUsuario6)
arbolBinario.Agregar(clienteUsuario7.nombre, clienteUsuario7)
arbolBinario.Agregar(clienteUsuario8.nombre, clienteUsuario8)
arbolBinario.Agregar(clienteUsuario9.nombre, clienteUsuario9)
arbolBinario.Agregar(clienteUsuario10.nombre, clienteUsuario10)
arbolBinario.Agregar(clienteUsuario11.nombre, clienteUsuario11)
arbolBinario.Agregar(clienteUsuario12.nombre, clienteUsuario12)

//! se mandan a llamar las funciones para su ejecucion
console.log('\nIn-Orden:\n')
arbolBinario.inOrder()
console.log('\nPre-Orden:\n')
arbolBinario.preOrder()

/*
console.log('\nPost-Orden:\n')
arbolBinario.postOrder()
var buscarDato = 'Crescencio'
console.log('\nBuscar: ' + buscarDato + '\n')
console.log(arbolBinario.Buscar(buscarDato))
//? console.log(t.findRecursive(12)) busquda que utiliza recursividad
console.log(arbolBinario.Buscar('Sonia'))// dato inexistente

var borrarDato = 'Kristell'
console.log('\nBorrar a: ' + borrarDato + '\n')
arbolBinario.Borrar(borrarDato)
arbolBinario.Borrar('Maria')
//arbolBinario.Borrar('Kristell') 
//? funcionamiento d caso 3 no disponible

console.log('\nContenido de arbol:\n')
//arbolBinario.print()
console.log('\nPre-Orden:\n')
arbolBinario.preOrder()
console.log('\nIn-Orden:\n')
arbolBinario.inOrder()
*/
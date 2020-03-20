class Registro {
        
    constructor(id,codigo,nombre,cantidad){
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
    };

    borrar(id){                
        db.collection("productos").doc(id).delete();
    };

    agregar(){
        db.collection("productos").add(
            {
                nombre: formulario.nombre.value,
                cantidad: formulario.cantidad.value,
                codigo: formulario.codigo.value
            }
        );
    }

    editar(id){    
        formularioeditar.nombreeditar.value = this.nombre;
        formularioeditar.codigoeditar.value = this.codigo;
        formularioeditar.cantidadeditar.value = this.cantidad;
        formularioeditar.ideditar.value = this.id;
    };

    actualizar(){    
        db.collection('productos').doc(this.id).update({
            codigo: this.codigo,
            nombre: this.nombre,
            cantidad: this.cantidad
        });
    };

};
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    var registro = new Registro(null, formulario.codigo, formulario.nombre, formulario.cantidad);
    registro.agregar();

    formulario.nombre.value = "";
    formulario.cantidad.value = "";
    formulario.codigo.value = "";
    $('#ventananuevo').modal('hide');
});
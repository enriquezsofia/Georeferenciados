formularioeditar.addEventListener("submit", (e) => {
    e.preventDefault();

    let id = formularioeditar.ideditar.value;
    let nombre = formularioeditar.nombreeditar.value;
    let codigo = formularioeditar.codigoeditar.value;
    let cantidad = formularioeditar.cantidadeditar.value;

    var registro = new Registro(id, codigo, nombre, cantidad);
    registro.actualizar();

    var idregistro = document.getElementById(id);
    idregistro.querySelector('#c_nom_id').textContent = nombre + ' ';
    idregistro.querySelector('#c_cod_id').textContent = codigo + ' ';
    idregistro.querySelector('#c_cant_id').textContent = cantidad + ' ';

    formularioeditar.nombreeditar.value = "";
    formularioeditar.cantidadeditar.value = "";
    formularioeditar.codigoeditar.value = "";
    $('#ventanaeditar').modal('hide');
});
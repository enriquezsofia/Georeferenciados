function muestraRegistros(doc) {
    var registro = new Registro(doc.id,doc.data().codigo,doc.data().nombre,doc.data().cantidad);

    let nombre = document.createElement("span");
    let codigo = document.createElement("span");
    let cantidad = document.createElement("span");

    nombre.textContent = doc.data().nombre;
    codigo.textContent = doc.data().codigo;
    cantidad.textContent = doc.data().cantidad;

    let borrar = document.createElement("button");
    borrar.className = "btn btn-danger m-3"
    borrar.textContent = "Borrar";

    let editar = document.createElement("button");
    editar.className = "btn btn-success m-3";
    editar.textContent = "Editar  ";
    editar.setAttribute("data-toggle", "modal");
    editar.setAttribute("data-target", "#ventanaeditar");


    var row = productostabla.insertRow(0);
    row.setAttribute("id", doc.id);
    var c_codigo = row.insertCell(0);
    var c_cantidad = row.insertCell(1);
    var c_nombre = row.insertCell(2);
    var c_options = row.insertCell(3);
    c_codigo.appendChild(codigo);
    c_cantidad.appendChild(cantidad);
    c_nombre.appendChild(nombre);
    c_options.appendChild(borrar);
    c_options.appendChild(editar);

    c_cantidad.id = "c_cant_id";
    c_codigo.id = "c_cod_id";
    c_nombre.id = "c_nom_id";


    borrar.addEventListener("click", (e) => {
        let id = e.target.parentElement.parentElement.getAttribute("id");
        //console.log(id);
        registro.borrar(id);
    });

    editar.addEventListener("click", (e) => {
        let id = e.target.parentElement.parentElement.getAttribute("id");
        console.log(id);
        registro.editar(id);
    });
}
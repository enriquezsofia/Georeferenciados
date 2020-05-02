const listaLoggedOut = document.querySelectorAll('.logged-out');
const listaLoggedIn = document.querySelectorAll('.logged-in');
const datosMiCuenta = document.querySelector('.datosMiCuenta');
const listaPlatillos = document.getElementById('listaplatillos');


const configurarMenu = (user) => {
    if(user) {
        db.collection('usuarios').doc(user.uid).get().then( doc => {
            const html = `
                <p>Nombre: ${ doc.data().nombre } </p>
                <p>Correo: ${ user.email } </p>
                <p>Teléfono: ${ doc.data().telefono } </p>
                <p>Dirección: ${ doc.data().direccion } </p>
            `;
            datosMiCuenta.innerHTML = html;
        });
        listaLoggedIn.forEach( item => item.style.display = 'block');
        listaLoggedOut.forEach( item => item.style.display = 'none');
    }else {
        listaLoggedIn.forEach( item => item.style.display = 'none');
        listaLoggedOut.forEach( item => item.style.display = 'block');
    }
};

const obtienePlatillos = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const platillo = doc.data();
            const columna = `
            <div class="col-12 col-md-4 mt-4">
                <div class="card">
                    <img class="card-img-top" src="images/${ platillo.imagen }">
                    <div class="card-body">
                        <h5 class="card-title">${ platillo.nombre }</h5>
                        <p class="card-text">$${ platillo.precio }</p>
                        <a href="https://www.paypal.me/grupohernandezalba/${ platillo.precio }" target="_blank" class="btn btn-primary">Pagar Ahora</a>
                    </div>
                </div>
            </div>
            `;

            html += columna;
        });

        listaPlatillos.innerHTML = html;
    } else {
        listaPlatillos.innerHTML = '<p class="text-center">Ingrese con sus claves para ver los platillos disponibles.</p>'
    }
};


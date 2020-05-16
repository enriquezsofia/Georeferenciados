const listaLoggedOut = document.querySelectorAll('.logged-out');
const listaLoggedIn = document.querySelectorAll('.logged-in');
const datosMiCuenta = document.querySelector('.datosMiCuenta');
const background = document.querySelector('.bg');


const configurarMenu = (user) => {
    if(user) {
        db.collection('usuarios').doc(user.uid).get().then( doc => {
            const html = `
                <p>Nombre: ${ doc.data().nombre } </p>
                <p>Correo: ${ user.email } </p>
                <p>Teléfono: ${ doc.data().telefono } </p>
                <p>Dirección: ${ doc.data().direccion } </p>
                <p>Coordenadas: ${ doc.data().coordenadas.latitude }, ${ doc.data().coordenadas.longitude } </p>
            `;
            datosMiCuenta.innerHTML = html;
        });
        listaLoggedIn.forEach( item => item.style.display = 'block');
        listaLoggedOut.forEach( item => item.style.display = 'none');

    }else {
        datosMiCuenta.innerHTML = '';
        listaLoggedIn.forEach( item => item.style.display = 'none');
        listaLoggedOut.forEach( item => item.style.display = 'block');
    }
};

const obtieneAmigos = (data) => {
    background.style.display = 'none';

    var map = new google.maps.Map(document.getElementById("map"), 
    { center: { lat: 48.8722344, lng: 2.7758079 }, zoom: 14 });

    data.forEach( doc => {
        informacion = new google.maps.InfoWindow;

        var pos = {
            lat: doc.data().coordenadas.latitude,
            lng: doc.data().coordenadas.longitude
        };

        informacion.setPosition(pos);
        informacion.setContent(doc.data().nombre);
        informacion.open(map);
    });
};

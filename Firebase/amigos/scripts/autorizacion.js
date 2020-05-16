const formaIngresar = document.getElementById("formIngresar");
const formaRegistrar = document.getElementById("formRegistrar");
const salir = document.getElementById("salir");

auth.onAuthStateChanged( user => {
    if(user){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                db.collection('usuarios').doc(user.uid).update({
                    coordenadas: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
            });
        }

        db.collection('usuarios').onSnapshot( snapshot => {
            obtieneAmigos(snapshot.docs);
            configurarMenu(user);
        }, err => {
            console.log(err.message);
        });

        var name, email, photoUrl, uid, emailVerified;

        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;
        
    }else {
        obtieneAmigos([]);
        configurarMenu(user);
    }
});

formaIngresar.addEventListener('submit', (e)=>{
    e.preventDefault();

    let correo = formaIngresar['correo'].value;
    let password = formaIngresar['password'].value;

    auth.signInWithEmailAndPassword(correo, password).then( cred => {
        console.log("Entró");

        $('#modalIngresar').modal('hide');
        formaIngresar.reset();
        formaIngresar.querySelector('.error').innerHTML="";
    }).catch( err => {
        formaIngresar.querySelector('.error').innerHTML=mensajeError(err.code);
        console.log(err);
    });
});

formaRegistrar.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const correo = formaRegistrar['rcorreo'].value;
    const password = formaRegistrar['rpassword'].value;

    auth.createUserWithEmailAndPassword(correo, password).then( cred =>{
        return db.collection('usuarios').doc(cred.user.uid).set({
            nombre: formaRegistrar['rnombre'].value,
            telefono: formaRegistrar['rtelefono'].value,
            direccion: formaRegistrar['rdireccion'].value
        });
    }).then(() =>{
        $('#modalRegistro').modal('hide');
        formaRegistrar.reset();
        formaRegistrar.querySelector('.error').innerHTML = "";
    }).catch( err => {
        formaRegistrar.querySelector('.error').innerHTML=mensajeError(err.code);
        console.log(err);
    });
});

salir.addEventListener('click', (e)=>{
    e.preventDefault();

    auth.signOut().then( ()=>{
        alert("El usuario ha salido del sistema");
    });
});

function mensajeError(codigo){
    let mensaje = '';
    switch(codigo){
        case 'auth/wrong-password':
            mensaje = 'Su contraseña no es correcta';
            break;
        case 'auth/user-not-found':
            mensaje = 'Usuario no encontrado';
            break; 
        case 'auth/weak-password':
            mensaje = 'Contraseña débil';
            break;
        default:
            mensaje = 'Ocurrió un error al ingresar con este usuario';
    }
    return mensaje;
}

entrarGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then( function(result) {
        var token = result.credential.accessToken;

        console.log(token);
        var user = result.user;

        let html = `
            <p>Nombre: ${ user.displayName }</p>
            <p>Correo: ${ user.email }</p>
            <img src="${ user.photoURL }" width="100%">
        `;

        datosMiCuenta.innerHTML= html;
        $('#modalIngresar').modal('hide');
        formaIngresar.reset();
        formaIngresar.querySelector('.error').innerHTML = '';
    }).catch( function(error){
        console.log(error);
    });
}

entrarFacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;;

        console.log(token);
        var user = result.user;

        let html = `
            <p>Nombre: ${ user.displayName }</p>
            <p>Correo: ${ user.email }</p>
            <img src="${ user.photoURL }" width="100%">
        `;

        datosMiCuenta.innerHTML= html;
        $('#modalIngresar').modal('hide');
        formaIngresar.reset();
        formaIngresar.querySelector('.error').innerHTML = '';
    }).catch( function(error){
        console.log(error);
    });
}
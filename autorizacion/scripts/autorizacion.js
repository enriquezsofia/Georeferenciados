const formaIngresar = document.getElementById("formIngresar");
const formaRegistrar = document.getElementById("formRegistrar");
const salir = document.getElementById("salir");

auth.onAuthStateChanged( user => {
    if(user){
        db.collection('platillos').onSnapshot( snapshot => {
            obtienePlatillos(snapshot.docs);
        });
        configurarMenu(user);
    }else {
        obtienePlatillos([]);
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
    });
}
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAft4C1iSrR52SGD91JxWv2bkFu1DWJREw",
    authDomain: "proyectomaha-66484.firebaseapp.com",
    databaseURL: "https://proyectomaha-66484.firebaseio.com",
    projectId: "proyectomaha-66484",
    storageBucket: "proyectomaha-66484.appspot.com",
    messagingSenderId: "424816898767",
    appId: "1:424816898767:web:b40e7e31a91be1db8d7dba",
    measurementId: "G-B7Z6K3GSGZ"
};

 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 firebase.analytics();
 const db = firebase.firestore();
var firebase = require("firebase/app")
require('firebase/auth')
const firebaseConfig = {
    apiKey: "AIzaSyAUYu-ER5CdKYdA41Kkx9V8YluhxXO7CaY",
    authDomain: "stormhack-14c1d.firebaseapp.com",
    databaseURL: "https://stormhack-14c1d-default-rtdb.firebaseio.com",
    projectId: "stormhack-14c1d",
    storageBucket: "stormhack-14c1d.appspot.com",
    messagingSenderId: "826589428961",
    appId: "1:826589428961:web:de129bb3c3ac4129950ba0"
};
firebase.initializeApp(firebaseConfig);

function createUser(email, password) {

    console.log("received email: ", email);

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;


        })
        .catch((error) => {
            console.log("********* FIREBASE ERROR **********")
            return error.message;
            // ..
        });


}


function signInExisting(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            return error.message;
        });

}


function checkSignedIn() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
}


function signOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
    res.end("signed out");
}

module.exports = {createUser, signInExisting, checkSignedIn, signOut}
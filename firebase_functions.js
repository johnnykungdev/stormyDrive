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

var admin = require("firebase-admin");

var serviceAccount = require("./stormhack-14c1d-firebase-adminsdk-gbrtg-4c4538b6e8.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://stormhack-14c1d-default-rtdb.firebaseio.com"
});

const db = admin.firestore();


function createUser(username, email, password) {

    console.log("received email: ", email);

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
        })
        .catch((error) => {
            console.log(error.message);
            return error.message;
            // ..
        });
        // saveChat("1", "2", "3");
    // saveChat("notVancouver", "test", "testuid").then(()=>{})
    //     .catch((error) => {console.log(error.message)});

}


function signInExisting(email, password) {
    return new Promise((res, rej) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            res(userCredential.user)
        })
        .catch((error) => {
            rej(error.message)
        })
    })

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

async function saveUsername(uID, username) {
    const data = {
        user_id : uID,
        username : username
    }
    const dbRef = db.collection('user').doc();
    await dbRef.set(data);
}

async function saveChat(district, message, userID) {
    const uid = auth().currentUser.uid;
    const data = {
        message : message,
        timestamp : admin.firestore.FieldValue.serverTimestamp(),
        user_id : userID
    }
    const dbRef = db.collection("district").doc(district).collection('chats').doc();

    await dbRef.set(data);
    // await db.collection("userssss").add({
    //     first: "no"
    // })
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
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
            saveUsername(user.uid, username);
        })
        .catch((error) => {
            console.log(error.message);
            return error.message;
            // ..
        });
    // saveChat("notVancouver", "test", "testuid").then(()=>{})
    //     .catch((error) => {console.log(error.message)});

}


function signInExisting(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
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

async function saveUsername(uID, username) {
    const data = {
        user_id: uID,
        username: username
    }
    const dbRef = db.collection('user').doc(uID);
    await dbRef.set(data);
}

async function testRunner() {
    const dbRef = db.collection("district").doc("Vancouver").collection("chats").doc();
    const data = {
        message: "1",
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        user_id: "testuser"
    }
    await dbRef.set(data);
    console.log("running testRunner");
}

async function saveChat(district, message) {
    const userID = firebase.auth().currentUser.uid;

    const userdb = db.collection("user").doc(userID);
    const doc = await userdb.get();
    const docJson = doc.data();
    let username = docJson['username'];


    const data = {
        message: message,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        user_id: userID,
        username: username
    }
    const dbRef = db.collection("district").doc(district).collection('chats').doc();

    await dbRef.set(data);

}

async function readLatestMessage(district) {
    const doc = db.collection("district").doc(district).collection("chats");
    doc.onSnapshot()

}


    // doc.onSnapshot((docSnapshot) => {
    //     let message = [];
    //     docSnapshot.docChanges().forEach(change => {
    //         if (change.type === 'added') {
    //             message.push(change.doc.data());
    //         // return change.doc.data();
    //         }
    //         console.log(message)
    //     });
    // });


// {
//     const data = docSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//     }));
//     console.log("****", data);
// }

async function readAllMessages(district) {
    const dbRef = db.collection("district").doc('Vancouver').collection("chats");
    const snapshot = await dbRef.get();
    if (snapshot.empty) {
        console.log("No comments");
        return;
    }
    snapshot.forEach(doc => {
        let data = doc.data();
        console.log(data['message']);

    })

}

function getID() {
    console.log(firebase.auth().currentUser.uid);
}

function signOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
    res.end("signed out");
}

async function getURL(district) {
    dbRef = db.collection("district").doc(district);
    const doc = await dbRef.get();
    let docJson = doc.data();
    console.log("got URL: ", docJson['url']);
    return docJson['url'];
}

module.exports = {
    createUser,
    signInExisting,
    checkSignedIn,
    signOut,
    getID,
    testRunner,
    readAllMessages,
    readLatestMessage,
    getURL
}
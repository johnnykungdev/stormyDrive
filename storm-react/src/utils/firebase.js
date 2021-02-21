import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAUYu-ER5CdKYdA41Kkx9V8YluhxXO7CaY",
    authDomain: "stormhack-14c1d.firebaseapp.com",
    databaseURL: "https://stormhack-14c1d-default-rtdb.firebaseio.com/",
    projectId: "stormhack-14c1d",
    storageBucket: "stormhack-14c1d.appspot.com",
    messagingSenderId: "826589428961",
    appId: "1:826589428961:web:de129bb3c3ac4129950ba0"
}
firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth
export const db = firebase.firestore()